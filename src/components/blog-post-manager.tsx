"use client"
import BlogListItem from "./blog-list-item";
import type { AdminPost } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { CircleX, CircleCheck, Star, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import BlogPostSkeleton from "./post-skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

type ViewType = "published" | "unpublished" | "featured" | undefined

export default function BlogPostManager({ posts } : { posts: Array<AdminPost> } ) {

    const router = useRouter()
    const searchParams = useSearchParams()
    const view = (searchParams.get("view") as ViewType) ?? undefined
    const [isPending, startTransition] = useTransition()
    const [ query, setQuery ] = useState('')
    const queryNormal = query.trim().toLowerCase()

    const filtered = posts.filter((post) => ( 
        
        post.title.toLowerCase().includes(queryNormal) 
        || 
        post.tags.some((tag) => tag.toLowerCase().includes(queryNormal))
        )
    )
    
    const empty = filtered.length === 0

    const handleViewChange = async (type: string, query: string) => {
        startTransition(() => {
            router.replace(`?view=${type}`, {scroll: false})
        })

    }
    

    return(
        <>
            <div className="flex flex-col gap-1">
                <div className="grid grid-cols-5 grid-rows-1 gap-2">
                    
                    <div className="flex items-center col-start-1 col-end-4 rounded-xl bg-muted/50">
                        <Button variant={'default'} className="bg-primary rounded-xl p-1.5 m-1" asChild>
                            <Link href="/admin/new" title="new post">
                                <Plus/>
                            </Link>
                        </Button>
                        <Input placeholder="Search it up..." className="rounded-xl h-full" onChange={(e) => setQuery(e.target.value)}/>
                    </div>
                    <div className="col-start-4 col-end-6 rounded-xl bg-muted/50 p-1">
                        <ToggleGroup className="w-full" type="single" variant={'outline'} value={view} onValueChange={(v) => handleViewChange(v, '')}>
                            <ToggleGroupItem value="published" className="flex-1 data-[state=on]:bg-emerald-200 rounded-xl">
                                <CircleCheck />
                                Published
                            </ToggleGroupItem>
                            <ToggleGroupItem value="unpublished" className="flex-1 data-[state=on]:bg-red-200 rounded-xl">
                                <CircleX />
                                Unpublished
                            </ToggleGroupItem>
                            <ToggleGroupItem value="featured" className="flex-1 data-[state=on]:bg-indigo-200 rounded-xl">
                                <Star />
                                Featured
                            </ToggleGroupItem>
                        </ToggleGroup>
                        
                    </div>
                </div>
            </div>
                
            <div className="flex grow flex-col items-start gap-4 overflow-y-auto rounded-xl bg-muted/50 p-2">
                {!isPending && 
                filtered.map(post => (
                <div key={post.slug} className="flex">
                    <BlogListItem {...post} variant='admin'></BlogListItem>
                </div>
                ))}
                {isPending &&
                 <BlogPostSkeleton />
                }
                {!isPending && empty &&
                    <div className="flex text-lg mt-20 self-center">I got nothing.</div>
                }
            </div>
        </>
    )
}