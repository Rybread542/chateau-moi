import { notFound } from "next/navigation"
import { requireAdmin } from "@/lib/auth"
import { getAdminPostBySlug } from "@/db/posts"
import PostEditor from "@/components/post-editor"

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {

  await requireAdmin()

  const { slug } = await params
  const post = await getAdminPostBySlug(slug)
  if (!post) notFound()

  return ( 
        <main className="flex flex-col grow px-10 py-6">
            <header className="text-xl mx-5">
                Edit Post
            </header>
            <PostEditor post={post} /> 
        </main>
        
    
  )
}