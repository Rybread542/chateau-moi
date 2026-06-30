import { redirect, notFound } from "next/navigation"
import { auth } from "@/lib/auth"

import PostEditor from "@/components/post-editor"

export default async function NewPostPage({ params }: { params: Promise<{ slug: string }> }) {

  const session = await auth()
  if (!session) redirect("/login")

  return ( 
        <main className="flex flex-col grow px-4 py-6">
            <header className="text-xl mx-5">
                New Post
            </header>
        <PostEditor /> 
        </main>
        
    
  )
}