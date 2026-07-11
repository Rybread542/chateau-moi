import type { PublishedPost } from "@/lib/utils";
import { getFeaturedPost } from "@/db/posts";
import { cn } from "@/lib/utils";
import BlogListItem from "./blog-list-item";
import FeaturedPost from "./featured-post";



export default async function BlogListView({posts, activeTag, displayFeatured} 
    : 
    {posts: PublishedPost[]; activeTag: string, displayFeatured: boolean}) 
    {

    const featuredPost = displayFeatured ? await getFeaturedPost() : undefined

    return(
        <div className={cn(
            "grid gap-10",
            featuredPost && "md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
            )}>
            <div className="flex min-w-0 flex-col divide-y divide-border">
                {posts.map(post => (
                <BlogListItem key={post.slug} post={post} activeTag={activeTag} admin={false} /> 
                ))}
            </div>

        {featuredPost &&
            <aside>
                <div className="order-first min-w-0 lg:order-none lg:top-10 lg:self-start">
                    <FeaturedPost post={featuredPost}></FeaturedPost>
                </div>
            </aside>
        }
        </div>
    )
}


