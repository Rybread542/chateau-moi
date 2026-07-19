import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/db/posts";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MainShell from "@/components/main-shell";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>
}

export async function generateMetadata({ params }: PageProps):
Promise<Metadata> {
    const { slug } = await params
    const post = await getPublishedPostBySlug(slug)

    return {
      title: post?.title ?? 'Not found',
      description: post?.description ?? 'Nothing here',
      openGraph: {
          title: post?.title ?? 'Not found',
          description: post?.description ?? 'Nothing here',
          images: [
            post?.image ? 
             { url: post.image, width: 600, height: 400}
             : 
             { url: '/default.png', width: 600, height: 400 }
            ],
          type: 'article'
      }
    }
  }

export default async function BlogPost({params} : PageProps) {

  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)

  if (!post) notFound()

  

  return (
    <MainShell>
      <div className="mx-auto w-full max-w-3xl">
        <figure className="relative mb-8 aspect-[2/1] w-full overflow-hidden rounded-xl">
          <Image src={post.image} alt={post.title} sizes="(min-width: 768px) 768px, 100vw" fill className="object-cover" />
        </figure>

        <header className="mb-10 flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {formatDate(post.publishedAt)}
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </header>

        <article className="prose prose-zinc prose-invert max-w-none
          prose-headings:tracking-tight
          prose-a:text-primary prose-a:decoration-primary/40 prose-a:underline-offset-4 hover:prose-a:decoration-primary
          prose-blockquote:border-l-primary/50
          prose-code:text-indigo-300 prose-pre:bg-muted
          prose-img:rounded-lg">
          <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
        </article>
      </div>
    </MainShell>
  );
}