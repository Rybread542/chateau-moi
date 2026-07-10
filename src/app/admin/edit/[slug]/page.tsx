import { redirect, notFound } from "next/navigation"
import { auth } from "@/lib/auth"
import { getPostBySlug } from "@/db/posts"
import PostEditor from "@/components/post-editor"

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {

  const session = await auth()
  if (!session) redirect("/login")

  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return ( 
        <main className="flex flex-col grow px-4 py-6">
            <header className="text-xl mx-5">
                Edit post
            </header>
        <PostEditor post={post} /> 
        </main>
        
    
  )
}