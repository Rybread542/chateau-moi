import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "@/db/posts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Post, PublishedPost } from "@/lib/utils";
import MainShell from "@/components/main-shell";

interface PageProps {
  params: Promise<{
    slug: string;
  }>
}

export default async function BlogPost({params} : PageProps) {

  const { slug } = await params
  const post : PublishedPost = await getPostBySlug(slug)

  return (
    <MainShell>
      <figure className="relative mb-8 aspect-[2/1] w-full overflow-hidden rounded-xl">
        <Image src="/default.png" alt="" fill className="object-cover" />
      </figure>

      <header className="mb-10 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {post.publishedAt.toLocaleDateString()}
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {post.description}
        </p>
      </header>

      <article className="prose prose-zinc dark:prose-invert max-w-none
        prose-headings:tracking-tight
        prose-a:text-primary prose-a:decoration-primary/40 prose-a:underline-offset-4 hover:prose-a:decoration-primary
        prose-blockquote:border-l-primary/50
        prose-code:text-indigo-300 prose-pre:bg-muted
        prose-img:rounded-lg">
        <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
      </article>
      
    </MainShell>
  );
}