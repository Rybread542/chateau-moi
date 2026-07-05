"use client"
import { TagsCount } from "@/lib/utils"
import { Badge } from "./ui/badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "./ui/scroll-area"
import { useRouter, useSearchParams } from "next/navigation"



export default function TagSort({ tagCounts }: { tagCounts: TagsCount }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentTag = searchParams.get("tag") ?? ""

    function handleTagSelect(tag: string) {
        router.push(`/blog/search?tag=${encodeURIComponent(tag)}`)
  }
    
    return(
        <Select value={currentTag} onValueChange={handleTagSelect}>
            <SelectTrigger>
                <SelectValue placeholder="Search by tag..." />
            </SelectTrigger>
                <SelectContent position="popper" side="bottom">
                    <ScrollArea className="h-48">
                        <SelectGroup>
                        {tagCounts.map(tag => (
                            <SelectItem key={tag.tag} value={tag.tag}>
                            <Badge variant="outline">{tag.tag} {tag.count}</Badge>
                            </SelectItem>
                        ))}
                        </SelectGroup>
                    </ScrollArea>
                </SelectContent>
        </Select>
        
    )
}