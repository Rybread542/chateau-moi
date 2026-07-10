'use server';
import { db } from "./index";
import { posts, tags, tagsJoin } from "./schema";
import { eq, or, desc, count, sql, and, inArray, getTableColumns, arrayContains, isNotNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { PublishedPost, Post } from '@/lib/utils';

type ClientPost = {
    slug: string;
    title: string;
    body:string;
    excerpt?: string | null;
    description: string;
    published: boolean;
    featured: boolean;
    tags: string[];
}


async function setTags(id: string, tagsArr: string[]) {
    await db.transaction(async (tx) => {
        await tx.insert(tags)
        .values(tagsArr.map((tag) => ({ tag })))
        .onConflictDoNothing()
        
        const tagRows = await tx.select({ id: tags.id, tag: tags.tag })
        .from(tags)
        .where(inArray(tags.tag, tagsArr))

        await tx.delete(tagsJoin)
        .where(eq(tagsJoin.postId, id))

        await tx.insert(tagsJoin)
        .values(tagRows.map((r) => ({ postId: id, tagId: r.id })))
    })
}


export async function getTagCounts() {

    const tagCounts = await db.select({
        tag: tags.tag,
        count: count(tagsJoin.postId)
    })
    .from(tags)
    .leftJoin(tagsJoin, eq(tagsJoin.tagId, tags.id))
    .leftJoin(posts, eq(tagsJoin.postId, posts.id))
    .where(eq(posts.published, true))
    .groupBy(tags.tag)
    .orderBy(desc(count(tagsJoin.postId)))

    return tagCounts
}


export async function createPost(data: ClientPost) {
    console.log('inserting post...')

    const [newPostId] = await db
    .insert(posts)
    .values({
        slug: data.slug,
        title: data.title,
        body: data.body,
        excerpt: data.excerpt ?? null,
        description: data.description,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
        featured: data.featured
    })
    .returning({id: posts.id})

    if (data.tags.length > 0) {
        await setTags(newPostId.id, data.tags)
    }
}

export async function getPostBySlug(slug: string) {
    const post = await db.select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1)

    return post[0] as PublishedPost
}


export async function getPostsPage(page: number, perPage: 10) {

    const offset = (page - 1) * perPage

    const publishedPosts = await db.select({
        ...getTableColumns(posts),
        tags: sql<string[]>
        `coalesce(
            array_agg(${tags.tag})
            filter (where ${tags.id} is not null),
            '{}'
            )`,
        totalCount: sql<number>`count(*) over ()::int`,
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .where(and(
        eq(posts.published, true),
        isNotNull(posts.publishedAt)
        ))
    .groupBy(posts.id)
    .orderBy(desc(posts.publishedAt))
    .limit(perPage)
    .offset(offset)

    const total = publishedPosts[0]?.totalCount ?? 0
    const finalPosts = publishedPosts.map(p => {
        const {totalCount, ...data} = p
        return data
    })

    return {posts: finalPosts as PublishedPost[], total}

    

}

export async function getSearchPostsPage(query: string, page: number, perPage: 10) {

    const doc = sql`
        setweight(to_tsvector('english', coalesce(${posts.title}, '')),       'A') ||
        setweight(to_tsvector('english', coalesce(${posts.description}, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(${posts.body}, '')),        'C')
    `
    const tsQuery = sql`websearch_to_tsquery('english', ${query})`

    const offset = (page - 1) * perPage

    const searchPosts = await db.select({
        ...getTableColumns(posts),
        tags: sql<string[]>
        `coalesce(
            array_agg(${tags.tag})
            filter (where ${tags.id} is not null),
            '{}'
            )`,
        totalCount: sql<number>`count(*) over ()::int`,
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .where(and(
        eq(posts.published, true),
        isNotNull(posts.publishedAt),
        sql`${doc} @@ ${tsQuery}`
    ))
    .groupBy(posts.id)
    .orderBy(desc(sql`ts_rank(${doc}, ${tsQuery})`))
    .limit(perPage)
    .offset(offset)

    const total = searchPosts[0]?.totalCount ?? 0
    const finalSearchPosts = searchPosts.map(p => {
        const {totalCount, ...data} = p
        return data
    })

    return {posts: finalSearchPosts as PublishedPost[], total}

}


export async function getTagPostsPage(tag: string, page: number, perPage: 10) {

    const offset = (page - 1) * perPage

    const tagPosts = await db.select({
        ...getTableColumns(posts),
        tags: sql<string[]>
        `coalesce(
            array_agg(${tags.tag} order by (${tags.tag} = ${tag}) desc)
            filter (where ${tags.id} is not null),
            '{}'
            )`,
        totalCount: sql<number>`count(*) over ()::int`,
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .where(and(
        eq(posts.published, true),
        isNotNull(posts.publishedAt)
        ))
    .groupBy(posts.id)
    .having(sql`${tag} = any(array_agg(${tags.tag}))`)
    .orderBy(desc(posts.publishedAt))
    .limit(perPage)
    .offset(offset)
    
    const total = tagPosts[0]?.totalCount ?? 0
    const finalTagPosts = tagPosts.map(p => {
        const {totalCount, ...data} = p
        return data
    })
    
    return {posts: finalTagPosts as PublishedPost[], total}
}

export async function getAllPosts() {
    const allPosts = await db.select({
        ...getTableColumns(posts),
        tags: sql<string[]>
        `coalesce(
            array_agg(${tags.tag})
            filter (where ${tags.id} is not null),
            '{}'
            )`
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .groupBy(posts.id)
    .orderBy(desc(posts.createdAt))

    return allPosts as Post[]
}

export async function getFeaturedPost() {
    const featuredPost = await db.select({
        ...getTableColumns(posts),
        tags: sql<string[]>
        `coalesce(
            array_agg(${tags.tag})
            filter (where ${tags.id} is not null),
            '{}'
            )`
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .where(eq(posts.featured, true))
    .groupBy(posts.id)
    .limit(1)

    return featuredPost[0] as PublishedPost
}


export async function editPost(post: ClientPost) {

    const currPost = await db.select().from(posts).where(eq(posts.slug,post.slug))
    .then((data) => data[0])

    if (!currPost.published && post.published) {
        await setPublished(post.slug, true)
    }

    if (currPost.published && !post.published) {
        await setPublished(post.slug, false)
    }

    if (currPost.featured && (!post.published || !post.featured)) {
        const mostRecent = await db.select({slug: posts.slug})
        .from(posts)
        .where(and(eq(posts.featured, false), eq(posts.published, true)))
        .orderBy(desc(posts.createdAt))
        .limit(1)
        .then(data => data[0])

        await setFeatured(mostRecent.slug)
    }

    if(!currPost.featured && post.featured) {
        await setFeatured(post.slug)
    }

    await db.update(posts)
    .set({
        title: post.title,
        body: post.body,
        description: post.description,
        excerpt: post.excerpt,
    })
    .where(eq(posts.slug, post.slug))

    if (post.tags.length > 0) {
        await setTags(currPost.id, post.tags)
    }
} 

export async function deletePost(id: string) {
    await db.delete(posts)
    .where(eq(posts.id, id))

    await db.delete(tagsJoin)
    .where(eq(tagsJoin.postId, id))
    revalidatePath('/admin')
}

export async function setPublished(slug: string, published: boolean) {
    const check = await alreadyPublished(slug)
    await db.update(posts).set({ 
        published, 
        publishedAt: (published && !check) 
        ? new Date() 
        : 
        sql`${posts.publishedAt}` }).where(eq(posts.slug, slug))
    revalidatePath('/admin')
}

export async function setFeatured(slug: string) {
    await db.update(posts).set({ featured: false })
    await db.update(posts).set({ featured: true }).where(eq(posts.slug, slug))
    revalidatePath('/admin')
}

export async function getPublishedPostsView() {
    const published = await db.select({
        ...getTableColumns(posts),
        tags: sql<string[]>
        `coalesce(
            array_agg(${tags.tag})
            filter (where ${tags.id} is not null),
            '{}'
            )`
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .where(eq(posts.published, true))
    .groupBy(posts.id)
    .orderBy(desc(posts.createdAt))

    return published as Post[]
}

export async function getUnpublishedPostsView() {
    const unpublished = await db.select({
        ...getTableColumns(posts),
        tags: sql<string[]>
        `coalesce(
            array_agg(${tags.tag})
            filter (where ${tags.id} is not null),
            '{}'
            )`
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .where(eq(posts.published, false))
    .groupBy(posts.id)
    .orderBy(desc(posts.createdAt))
    return unpublished as Post[]
}

export async function getFeaturedPostsView() {
    const featured = await db.select({
        ...getTableColumns(posts),
        tags: sql<string[]>
        `coalesce(
            array_agg(${tags.tag})
            filter (where ${tags.id} is not null),
            '{}'
            )`
    })
    .from(posts)
    .leftJoin(tagsJoin, eq(posts.id, tagsJoin.postId))
    .leftJoin(tags, eq(tagsJoin.tagId, tags.id))
    .where(eq(posts.featured, true))
    .groupBy(posts.id)
    .orderBy(desc(posts.createdAt))
    return featured as Post[]
}


export async function alreadyPublished(slug: string) {
    const check = await db.select({publishedAt: posts.publishedAt})
    .from(posts)
    .where(eq(posts.slug, slug))

    return Boolean(check[1])
}

