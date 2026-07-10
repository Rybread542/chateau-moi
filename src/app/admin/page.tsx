import { requireAdmin } from '@/lib/auth'
import { getAdminPosts, AdminView } from '@/db/posts'
import BlogPostManager from '@/components/blog-post-manager';
import { Post } from '@/lib/utils';


export default async function AdminPage({ searchParams }: { searchParams: Promise<{ view?: AdminView }> }) {

  await requireAdmin()

  const unwrappedParams = await searchParams
  const view = unwrappedParams.view ?? "all"
  const posts: Post[] = await getAdminPosts(view)

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