import 'dotenv/config';
import Image from "next/image";
import FeaturedPost from "@/components/featuredpost";
import { getPosts } from '@/db/posts';
import Link from "next/link";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

const posts = await getPosts('list', null)
const featuredPost = posts.find(item => item.featured)!
const featuredProps = {
    slug: featuredPost.slug,
    title: featuredPost.title,
    description: featuredPost.description,
    publishedAt: featuredPost.publishedAt  
}



export default function Blog() {

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
                {posts.map(post => (
                    <Item key={post.slug} variant={'outline'} className="h-full w-full" asChild>
                        <Link href={'/blog/' + post.slug}>
                            <ItemMedia variant={'image'}>
                                <Image src={'/default.png'} alt="yes" fill className=""></Image>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>
                                    {post.title}
                                </ItemTitle>
                                <ItemDescription>
                                    {post.description}
                                </ItemDescription>
                                <ItemDescription>
                                    {post.publishedAt?.toLocaleDateString()}
                                </ItemDescription>
                            </ItemContent>
                        </Link>
                    </Item>
                ))}
           </div>
      </main>
    
  );
}
