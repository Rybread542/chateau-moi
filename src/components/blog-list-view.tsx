import type { PublishedPost } from "@/lib/utils";
import BlogListItem from "./blog-list-item";
import FeaturedPost from "./featuredpost";
import { getFeaturedPost } from "@/db/posts";



export default async function BlogListView({posts, activeTag, displayFeatured} 
    : 
    {posts: PublishedPost[]; activeTag: string, displayFeatured: boolean}) 
    {

    const featuredPost = await getFeaturedPost()

    return(
        <div className="flex items-start gap-2">
            <div className="flex basis-2/3 flex-col gap-6 min-w-0">
                {posts.map(post => (
                <BlogListItem key={post.slug} post={post} activeTag={activeTag} admin={false} /> 
                ))}
            </div>

        {displayFeatured &&
            <div className="basis-1/3">
                <div className="md:col-span-2 min-w-0">
                    <FeaturedPost post={featuredPost}></FeaturedPost>
                </div>
            </div>
        }
        </div>
    )
}


