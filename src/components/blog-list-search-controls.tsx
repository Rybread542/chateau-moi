import BlogSearchBar from "./blog-search-bar";
import TagSort from "./tag-sort";
import { getTagCounts } from "@/db/posts";



export default async function BlogSearchControls() {

  const tagCounts = await getTagCounts()  

  return (
    <div className='py-2 flex justify-start items-center gap-2'>
        <BlogSearchBar />
        <TagSort tagCounts={tagCounts} />
    </div>
  )
}