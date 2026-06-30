import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "@/db/posts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PageProps {
  params: Promise<{
    slug: string;
  }>
}

export default async function BlogPost({params} : PageProps) {

  const { slug } = await params
  const postInfo = await getPostBySlug(slug)
  const post = postInfo[0]

  return (
    <>
      <header className="text-xl my-4 mx-5">
        <Link href="/blog">Ryan Bread's Blog</Link>
      </header>
      <div className="mx-auto my-5">
          <Image src={'/default.png'} alt="yeah" width={500} height={500}></Image>
      </div>
      <div className="flex flex-col md:flex-row mx-auto gap-4 py-8 justify-evenly w-100 sm:w-170">
        
        <div className="flex flex-col">
            <div className="sm:text-2xl text-3xl font-bold">
                {post.title}
            </div>
            <div className="sm:text-sm text-md text-zinc-500">
                {post.publishedAt?.toLocaleDateString()}
            </div>
        </div>

        <div className="sm:text-sm text-xl font-light">
            {post.description}
        </div>

      </div>

      <article className="prose prose-sm px-12 mx-auto my-4 max-w-180 md:prose-base md:px-0 lg:prose-lg">
        <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
      </article>
    </>
  );
}