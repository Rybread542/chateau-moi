import { getPostsPage, PER_PAGE } from '@/db/posts';
import BlogListView from '@/components/blog-list-view';
import { Paginate } from '@/components/paginate';
import BlogSearchControls from '@/components/blog-list-search-controls';
import MainShell from '@/components/main-shell';
import PageHeader from '@/components/page-header';


export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {

    const params = await searchParams
    const page = Math.max(1, Number(params.page) || 1)
    const displayFeatured = page === 1

    const {posts, total} = await getPostsPage(page)
    const totalPages = Math.ceil(total / PER_PAGE)
    
    return (
        <MainShell>
            <PageHeader title="Blog" sub="maybe"/>
            <BlogSearchControls returnButton={false}/>
            {posts.length === 0 ? 
                <div className="flex items-center mx-auto flex-1">
                    <div>{"There's nothing here! Wow!"}</div>
                </div>
                :
                <>
                <BlogListView posts={posts} activeTag="" displayFeatured={displayFeatured}/>
                <Paginate totalPages={totalPages} currPage={page} searchParams={params} mode="index"/>
                </>
            }
            
        </MainShell>
        
  )
}
