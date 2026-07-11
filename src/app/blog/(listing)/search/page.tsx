import 'dotenv/config';
import BlogListView from '@/components/blog-list-view';
import { getSearchPostsPage, getTagPostsPage, PER_PAGE } from '@/db/posts';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Paginate } from '@/components/paginate';
import BlogSearchControls from '@/components/blog-list-search-controls';
import MainShell from '@/components/main-shell';
import PageHeader from '@/components/page-header';



export default async function BlogSearch({
  searchParams 
  }: { 
  searchParams: Promise<{ query?: string, tag?: string, page?: string }>}) {

  const params = await searchParams

  const query = params.query ?? ''
  const tag = params.tag ?? ''

  if ((!query && !tag) || (query && tag)) redirect('/blog')
    
  const page = Math.max(1, Number(params.page) || 1)

  const {posts, total} = query ? 
  await getSearchPostsPage(query, page)
  :
  await getTagPostsPage(tag, page)

  const totalPages = Math.ceil(total / PER_PAGE)

  const heading = query ? (
    <>Results for <span className="font-mono bg-muted/50 p-1">{query}</span></>
  ) : (
    <>Posts tagged <Badge variant="default" className="text-xl h-full rounded-xl">{tag}</Badge></>
  )

  return (
    <MainShell>
          <PageHeader title={heading}/>

          <BlogSearchControls returnButton/>

        {posts.length === 0 ? 
        (
        <div className="flex flex-1 items-center justify-center py-16 text-muted-foreground">
          <div>I got nothing.</div>
        </div>
        ) 
        : 
        (
        <>
          <BlogListView posts={posts} activeTag={tag} displayFeatured={false} />
          <Paginate totalPages={totalPages} currPage={page} searchParams={params} mode="search" />
        </>
        )
      }

    </MainShell>
  )
}