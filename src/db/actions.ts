'use server'
import { db } from './index'
import { posts, tags, tagsJoin } from './schema'
import { and, desc, eq, inArray, ne } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'


type InputPost = {
    slug: string;
    title: string;
    body:string;
    excerpt?: string | null;
    description: string;
    published: boolean;
    featured: boolean;
    image: string;
    tags: string[];
}


async function requireAdmin() {
  const session = await auth()
  if (!session) throw new Error('Auth failed')
}

function revalidateBlog() {
  revalidatePath('/blog', 'layout')
  revalidatePath('/admin')
}


async function setTags(postId: string, tagList: string[]) {
  await db.transaction(async (tx) => {
    await tx.delete(tagsJoin)
    .where(eq(tagsJoin.postId, postId))
    if (tagList.length === 0) return

    await tx.insert(tags)
      .values(tagList.map((tag) => ({ tag })))
      .onConflictDoNothing()

    const tagRows = await tx.select({ id: tags.id })
      .from(tags)
      .where(inArray(tags.tag, tagList))

    await tx.insert(tagsJoin)
      .values(tagRows.map((r) => ({ postId, tagId: r.id })))
  })
}

async function resetFeatured(except: string) {
  await db.update(posts)
  .set({ featured: false })
  .where(ne(posts.id, except))
}


export async function createPost(input: InputPost) {
  await requireAdmin()

  const [newPost] = await db.insert(posts)
  .values({
    slug: input.slug,
    title: input.title,
    body: input.body,
    excerpt: input.excerpt ?? null,
    description: input.description,
    published: input.published,
    publishedAt: input.published ? new Date() : null,
    image: input.image,
    featured: input.featured && input.published,
  }).returning({ id: posts.id })

  await setTags(newPost.id, input.tags)
  if (input.featured && input.published) await resetFeatured(newPost.id)

  revalidateBlog()
}


export async function editPost(input: InputPost) {
    
    await requireAdmin()

    const current = await db.select()
    .from(posts)
    .where(eq(posts.slug, input.slug))
    .then((data) => data[0])

    if (!current) throw new Error('post not found')

    const publishedAt =
    input.published && !current.publishedAt ? new Date() : current.publishedAt

    const featured = input.featured && input.published

    await db.update(posts).set({
    title: input.title,
    body: input.body,
    description: input.description,
    excerpt: input.excerpt ?? null,
    published: input.published,
    publishedAt,
    image: input.image,
    featured,
  }).where(eq(posts.id, current.id))


  if (featured && !current.featured) {
    await resetFeatured(current.id)
  }

    if (current.featured && !featured) {
        const next = await db.select({ id: posts.id })
        .from(posts)
        .where(and(eq(posts.published, true), ne(posts.id, current.id)))
        .orderBy(desc(posts.publishedAt))
        .limit(1)
        .then((data) => data[0])

        if (next) {
        await db.update(posts)
        .set({ featured: true })
        .where(eq(posts.id, next.id))
        }
    }

    await setTags(current.id, input.tags)

    revalidateBlog()
}


export async function deletePost(id: string) {
  await requireAdmin()
  await db.delete(posts).where(eq(posts.id, id))
  revalidateBlog()
}