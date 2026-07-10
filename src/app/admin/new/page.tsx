import { requireAdmin } from "@/lib/auth"

import PostEditor from "@/components/post-editor"

export default async function NewPostPage() {

  await requireAdmin()

  return ( 
        <main className="flex flex-col grow px-4 py-6">
            <header className="text-xl mx-5">
                New Post
            </header>
            <PostEditor /> 
        </main>
  )
}