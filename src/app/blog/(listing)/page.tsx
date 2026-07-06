import 'dotenv/config';
import { getPostsPage, getPublishedPosts, getTagCounts } from '@/db/posts';
import BlogListView from '@/components/blog-list-view';
import { Suspense } from 'react';
import BlogSearchBar from '@/components/blog-search-bar';
import TagSort from '@/components/tag-sort';
import { PublishedPost, TagsCount } from '@/lib/utils';
import { Paginate } from '@/components/paginate';
import BlogSearchControls from '@/components/blog-list-search-controls';


export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {

    const params = await searchParams
    const perPage = 10
    const page = Math.max(1, Number(params.page) || 1)
    const displayFeatured = page === 1

    const {posts, total} = await getPostsPage(page, perPage)
    const totalPages = Math.ceil(total / perPage)

    if (posts.length < 1) {
        return (
        <div className="flex items-center mx-auto flex-1">
            <div>There's nothing here! Wow!</div>
        </div>
        )
    }
    
    return (
        <main className="flex flex-col grow px-18 py-16">
            <div className="text-3xl mb-4">Blog</div>

                <BlogSearchControls />

            <BlogListView posts={posts} activeTag='' displayFeatured={displayFeatured}/>
            <Paginate totalPages={totalPages} currPage={page} searchParams={params} mode='index'/>
        </main>
        
  )
}
