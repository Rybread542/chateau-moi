import { Badge } from "./ui/badge";
import { ChevronUpIcon, Search } from "lucide-react";
import BlogSearchBar from "./blog-search-bar";
import TagSort from "./tag-sort";
import { getTagCounts } from "@/db/posts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "./ui/button";
import { Card, CardTitle, CardAction, CardContent } from "./ui/card";



export default async function BlogSearchControls() {

  const tagCounts = await getTagCounts()  

  return (

    <div className='py-2 flex justify-start items-center gap-2'>
        <BlogSearchBar />
        <TagSort tagCounts={tagCounts} />
    </div>
  )
}