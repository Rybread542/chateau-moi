import 'dotenv/config';
import { db } from "./index";
import { posts } from "./schema";
import { eq } from 'drizzle-orm';

type NewPost = {
    slug: string;
    title: string;
    body:string;
    excerpt?: string | null;
    description: string;
    published?: boolean;
    featured?: boolean;
}

export async function createPost(data: NewPost) {
    console.log('inserting post...')
    const [post] = await db
    .insert(posts)
    .values({
        slug: data.slug,
        title: data.title,
        body: data.body,
        excerpt: data.excerpt ?? null,
        description: data.description,
        published: data.published ?? false,
        publishedAt: data.published ? new Date() : null,
        featured: data.featured ?? false
    })
    .returning()

    
    return post
}

export async function getPosts(type : "complete" | "list" | null, slug : string | null) {
    let postInfo
    const complete = type === "complete"

    postInfo = await db.select({
        ...(complete ? { 
            id: posts.id,
            published: posts.published,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt
        } 
            : 
            {}),

        ...(slug || complete ? { 
            body: posts.body
        } 
            : 
            {}),

        slug: posts.slug,
        title: posts.title,
        excerpt: posts.excerpt,
        featured: posts.featured,
        description: posts.description,
        publishedAt: posts.publishedAt
    }).from(posts)
    .where(slug ? eq(posts.slug, slug) : undefined)

    return postInfo
}
