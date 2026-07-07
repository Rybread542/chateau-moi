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
        {query ?
          <header className="mb-8 flex justify-start">
            <h1 className="text-3xl font-semibold tracking-tight">Results for <span className='font-mono bg-muted/90 p-2'>{query}</span></h1>
          </header>
          :
          <header className="mb-8 flex justify-start">
            <h1 className="text-3xl font-semibold tracking-tight">Posts tagged <Badge variant="default" className='text-xl h-full rounded-xl'>{params.tag}</Badge></h1>
          </header>
        }
        <BlogSearchControls />
        <div className="flex items-center mx-auto flex-1">
          <div>I got nothing.</div>
        </div>
      </MainShell>
        
      )
  }


  
  return (
    <MainShell>
        {query ?
          <header className="mb-8 flex justify-start">
            <h1 className="text-3xl font-semibold tracking-tight">Results for <span className='font-mono bg-muted/50 p-1'>{query}</span></h1>
          </header>
          :
          <header className="mb-8 flex justify-start">
            <h1 className="text-3xl font-semibold tracking-tight">Posts tagged <Badge variant="default" className='text-xl h-full rounded-full'>{params.tag}</Badge></h1>
          </header>
        }

          <BlogSearchControls />

        <BlogListView posts={posts} activeTag={tag} displayFeatured={false}/>
        <Paginate totalPages={totalPages} currPage={page} searchParams={params} mode='search'/>
    </MainShell>
  )
}