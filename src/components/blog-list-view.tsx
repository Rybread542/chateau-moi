import type { PublishedPost } from "@/lib/utils";
import BlogListItem from "./blog-list-item";
import FeaturedPost from "./featuredpost";
import { getFeaturedPost } from "@/db/posts";

const featuredPost = await getFeaturedPost()

export default function BlogListView({posts, activeTag, displayFeatured} 
    : 
    {posts: PublishedPost[]; activeTag: string, displayFeatured: boolean}) 
    {

    

    return(
        <div className="flex items-start">
            <div className="flex basis-2/3 flex-col gap-4 min-w-0">
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


