import BlogSearchBar from "./blog-search-bar";
import TagSort from "./tag-sort";
import { getTagCounts } from "@/db/posts";
import NavButton from "./nav-button";
import { ArrowLeft } from "lucide-react";



export default async function BlogSearchControls({ returnButton } : { returnButton: boolean }) {

  const tagCounts = await getTagCounts()  

  return (
    <div className='py-2 flex flex-col items-start sm:flex-row justify-start md:items-center gap-2'>
        {returnButton &&
          <NavButton text={<ArrowLeft />} navTo="/blog" />
        }
        <BlogSearchBar />
        <TagSort tagCounts={tagCounts} />
    </div>
  )
}