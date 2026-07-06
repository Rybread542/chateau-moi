import 'dotenv/config';
import BlogListView from '@/components/blog-list-view';
import { getSearchPostsPage, getTagPostsPage } from '@/db/posts';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Paginate } from '@/components/paginate';
import BlogSearchControls from '@/components/blog-list-search-controls';
import MainShell from '@/components/main-shell';



export default async function BlogSearch({
  searchParams 
  }: { 
  searchParams: Promise<{ query?: string, tag?: string, page?: string }>}) {

  const params = await searchParams

  const query = params.query ?? ''
  const tag = params.tag ?? ''

  
  const perPage = 10
  const page = Math.max(1, Number(params.page) || 1)

  const {posts, total} = query ? 
  await getSearchPostsPage(query, page, perPage)
  :
  await getTagPostsPage(tag, page, perPage)

  const totalPages = Math.ceil(total / perPage)

  if ((!query && !tag) || (query && tag)) {
    redirect('/blog')
  }

  if (posts.length < 1) {
    return (

      <MainShell>
        <div className="mx-auto mb-4">
        {query ?
        <>Results for <span className='font-mono bg-muted/50 p-1'>{query}</span></>
        :
        <>Posts tagged <Badge variant="default">{params.tag}</Badge></>
        }
        </div>
        <BlogSearchControls />
        <div className="flex items-center mx-auto flex-1">
          <div>I got nothing.</div>
        </div>
      </MainShell>
        
      )
  }


  
  return (
    <MainShell>
        <div className="mx-auto mb-4">
          {query ?
          <>Results for <span className='font-mono bg-muted/50 p-1'>{query}</span></>
          :
          <>Posts tagged <Badge variant="default">{params.tag}</Badge></>
          }
        </div>

          <BlogSearchControls />

        <BlogListView posts={posts} activeTag={tag} displayFeatured={false}/>
        <Paginate totalPages={totalPages} currPage={page} searchParams={params} mode='search'/>
    </MainShell>
  )
}