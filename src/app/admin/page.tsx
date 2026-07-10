import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getAllPosts, 
  getPublishedPostsView, 
  getUnpublishedPostsView, 
  getFeaturedPostsView } from '@/db/posts'
import BlogPostManager from '@/components/blog-post-manager';
import { Post } from '@/lib/utils';


export default async function AdminPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {

  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }

  const unwrappedParams = await searchParams
  const view = unwrappedParams.view ?? "all"
  const posts: Post[] =
    view === "unpublished" ? await getUnpublishedPostsView()
    : view === "published" ? await getPublishedPostsView()
    : view === "featured"  ? await getFeaturedPostsView()
    : await getAllPosts()

  return(
    <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50">This is the admin page and you are authed</div>
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>

         <BlogPostManager posts={posts} />
    </div>
  
  )
  }