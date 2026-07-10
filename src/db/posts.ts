import 'server-only';
import { db } from "./index";
import { posts, tags, tagsJoin } from "./schema";
import { eq, desc, count, sql, and, getTableColumns, isNotNull } from 'drizzle-orm';
import { PublishedPost, Post } from '@/lib/utils';


/////////////////// Helpers

export const PER_PAGE = 10

const aggregateTags = sql<string[]>`
    coalesce(array_agg(${tags.tag}) filter (where ${tags.id} is not null), '{}')
`

const totalPostsCount = sql<number>`count(*) over ()::int`

const isPublished = and(eq(posts.published, true), isNotNull(posts.publishedAt))

function getPosts() {
    return db
    .select({ 
        ...getTableColumns(posts), 
        tags: aggregateTags, 
        totalCount: totalPostsCount
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .groupBy(posts.id)
    .$dynamic()
}

function stripTotal<T extends { totalCount: number }>(rows: T[]) {
  const total = rows[0]?.totalCount ?? 0
  const stripped = rows.map(({ totalCount: _t, ...post }) => post)
  return { rows: stripped, total }
}



//////////////////////// General public post queries

export async function getPostsPage(page: number) {

    const rows = await getPosts()
    .where(isPublished)
    .orderBy(desc(posts.publishedAt))
    .limit(PER_PAGE)
    .offset((page - 1) * PER_PAGE)

    const { rows: postsPage, total } = stripTotal(rows)
    return { posts: postsPage as PublishedPost[], total }
}

export async function getSearchPostsPage(query: string, page: number) {

    const doc = sql`
        setweight(to_tsvector('english', coalesce(${posts.title}, '')),       'A') ||
        setweight(to_tsvector('english', coalesce(${posts.description}, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(${posts.body}, '')),        'C')
    `
    const tsQuery = sql`websearch_to_tsquery('english', ${query})`

    const rows = await getPosts()
    .where(and(isPublished, sql`${doc} @@ ${tsQuery}`))
    .orderBy(desc(sql`ts_rank(${doc}, ${tsQuery})`))
    .limit(PER_PAGE)
    .offset((page - 1) * PER_PAGE)

    const { rows: postsPage, total } = stripTotal(rows)
    return { posts: postsPage as PublishedPost[], total }
}


export async function getTagPostsPage(tag: string, page: number) {

    const rows = await db
    .select({
      ...getTableColumns(posts),
      tags: sql<string[]>`
        coalesce(
          array_agg(${tags.tag} order by (${tags.tag} = ${tag}) desc)
          filter (where ${tags.id} is not null),
          '{}'
        )`,
      totalCount: totalPostsCount,
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .where(isPublished)
    .groupBy(posts.id)
    .having(sql`${tag} = any(array_agg(${tags.tag}))`)
    .orderBy(desc(posts.publishedAt))
    .limit(PER_PAGE)
    .offset((page - 1) * PER_PAGE)

    const { rows: postsPage, total } = stripTotal(rows)
    return { posts: postsPage as PublishedPost[], total }
}

export async function getPublishedPostBySlug(slug: string) {
  const post = await getPosts()
    .where(and(eq(posts.slug, slug), isPublished))
    .limit(1)

  return stripTotal(post).rows[0] as PublishedPost | undefined
}

export async function getFeaturedPost() {
  const post = await getPosts()
    .where(and(eq(posts.featured, true), isPublished))
    .limit(1)
  return stripTotal(post).rows[0] as PublishedPost | undefined

}

export async function getTagCounts() {
  return db
    .select({ tag: tags.tag, count: count(tagsJoin.postId) })
    .from(tags)
    .leftJoin(tagsJoin, eq(tagsJoin.tagId, tags.id))
    .leftJoin(posts, eq(tagsJoin.postId, posts.id))
    .where(eq(posts.published, true))
    .groupBy(tags.tag)
    .orderBy(desc(count(tagsJoin.postId)))
}


///////////////////////////////// Admin dashboard views and queries

export type AdminView = 'all' | 'published' | 'unpublished' | 'featured'

const viewFilters = {
  all: undefined,
  published: eq(posts.published, true),
  unpublished: eq(posts.published, false),
  featured: eq(posts.featured, true),
} as const


export async function getAdminPosts(view: AdminView = 'all') {

  let query = getPosts()
  const filter = viewFilters[view]

  if (filter) query = query.where(filter)

  const rows = await query.orderBy(desc(posts.createdAt))
  return stripTotal(rows).rows as Post[]
}

export async function getAdminPostBySlug(slug: string) {

  const rows = await getPosts()
  .where(eq(posts.slug, slug))
  .limit(1)

  return stripTotal(rows).rows[0] as Post | undefined
}


