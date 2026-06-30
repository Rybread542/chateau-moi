'use server';
import 'dotenv/config';
import { db } from "./index";
import { posts } from "./schema";
import { eq, or, desc, count, sql, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

type Post = {
    slug: string;
    title: string;
    body:string;
    excerpt?: string | null;
    description: string;
    published: boolean;
    featured: boolean;
    tags: string[];
}


export async function createPost(data: Post) {
    console.log('inserting post...')
    const [post] = await db
    .insert(posts)
    .values({
        slug: data.slug,
        title: data.title,
        body: data.body,
        excerpt: data.excerpt ?? null,
        description: data.description,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
        featured: data.featured,
        tags: data.tags
    })
    .returning()
    
    return post
}

export async function getPostBySlug(slug: string) {
    const post = await db.select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1)

    return post
}

export async function getPublishedPosts() {
    const publishedPosts = await db.select({
        slug: posts.slug,
        title: posts.title,
        excerpt: posts.excerpt,
        featured: posts.featured,
        description: posts.description,
        publishedAt: posts.publishedAt,
        tags: posts.tags
    })
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt))

    return publishedPosts
}

export async function getAllPosts() {
    const allPosts = await db.select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

    return allPosts
}


export async function editPost(post: Post) {

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
        tags: post.tags
    })
    .where(eq(posts.slug, post.slug))
} 

export async function deletePost(slug: string) {
    await db.delete(posts).where(eq(posts.slug, slug))
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

export async function getNumPosts() {
    const rowCount = await db.select({count: count()}).from(posts)
    return rowCount[0]
}

export async function getPublishedPostsView() {
    const published = await db.select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    return published
}

export async function getUnpublishedPostsView() {
    const unpublished = await db.select()
    .from(posts)
    .where(eq(posts.published, false))
    .orderBy(desc(posts.createdAt))
    return unpublished
}

export async function getFeaturedPostsView() {
    const featured = await db.select()
    .from(posts)
    .where(eq(posts.featured, true))
    .orderBy(desc(posts.createdAt))
    return featured
}



export async function getPostsView(type: "featured" | "published" | "unpublished") {
    const postsView = await db.select()
    .from(posts)
    .orderBy(desc(posts.createdAt))

    return postsView
}

export async function alreadyPublished(slug: string) {
    const check = await db.select({publishedAt: posts.publishedAt})
    .from(posts)
    .where(eq(posts.slug, slug))

    return Boolean(check[1])
}

