import 'dotenv/config';
import FeaturedPost from "@/components/featuredpost";
import { getPublishedPosts } from '@/db/posts';
import BlogListItem from '@/components/blog-list-item';


export default async function Blog() {

    const posts = await getPublishedPosts()
    if (!posts) {
        return (

        <main className="flex flex-col items-center mx-auto h-screen">
            <div className="mx-auto text-3xl">Blog</div>
            <div className="flex items-center mx-auto flex-1">
                <div>There's nothing here! Wow!</div>
            </div>
        </main>

        )
    }
    const featuredPost = posts.find(item => item.featured)!
    const featuredProps = {
        slug: featuredPost.slug,
        title: featuredPost.title,
        description: featuredPost.description,
        publishedAt: featuredPost.publishedAt  
}

  return (
      <main className="flex flex-col grow px-4 py-12">
           <div className="mx-auto text-3xl">Blog</div>
           <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 min-w-0 my-4">
                    <FeaturedPost {...featuredProps}></FeaturedPost>
                </div>
                <aside></aside>
           </div>
           <div className="text-left text-xl">
                More posts
           </div>
           <div className="flex flex-col gap-4">
                {posts.filter(post => !post.featured).map(post => (
                    <BlogListItem key={post.slug} {...post} variant='list'/> 
                ))}
           </div>
      </main>
    
  );
}
