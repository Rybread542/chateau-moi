"use client"
import BlogListItem from "./blog-list-item";
import type { Post } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { CircleX, CircleCheck, Star, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import BlogPostSkeleton from "./post-skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

type ViewType = "published" | "unpublished" | "featured" | undefined

export default function BlogPostManager({ posts } : { posts: Array<Post> } ) {

    const router = useRouter()
    const searchParams = useSearchParams()
    const view = (searchParams.get("view") as ViewType) ?? undefined
    const [isPending, startTransition] = useTransition()
    const [ query, setQuery ] = useState('')
    const queryNormal = query.trim().toLowerCase()

    const filtered = posts.filter((post) => ( 
        
        post.title.toLowerCase().includes(queryNormal) 
        || 
        post.tags.some((tag) => tag.toLowerCase().startsWith(queryNormal))
        )
    )
    
    const empty = filtered.length === 0

    const handleViewChange = async (type: string) => {
        startTransition(() => {
            router.replace(`?view=${type}`, {scroll: false})
        })

    }

    return(
        <>
            <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-1 justify-between rounded-lg bg-muted/50 p-1">
                    
                    <div className="flex items-center flex-1 col-start-1 col-end-4 rounded-xl bg-muted/50 gap-2">
                        <Button variant={'default'} size={'icon'} className="rounded-md" asChild>
                            <Link href="/admin/new" title="new post">
                                <Plus/>
                            </Link>
                        </Button>
                        <Input placeholder="Search it up..." className="h-9 rounded-md border-0 bg-transparent shadow-none" onChange={(e) => setQuery(e.target.value)}/>
                    </div>
    
                        <ToggleGroup className="rounded-lg bg-muted/50 p-1" type="single" variant={'outline'} value={view} onValueChange={(v) => handleViewChange(v)}>
                            <ToggleGroupItem value="published" className="flex-1 hover:bg-emerald-600/40 data-[state=on]:bg-emerald-600/40 rounded-xl border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <CircleCheck />
                                Published
                            </ToggleGroupItem>
                            <ToggleGroupItem value="unpublished" className="flex-1 hover:bg-red-500/40 data-[state=on]:bg-red-500/40 rounded-xl border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400">
                                <CircleX />
                                Unpublished
                            </ToggleGroupItem>
                            <ToggleGroupItem value="featured" className="flex-1 hover:bg-indigo-500/40 data-[state=on]:bg-indigo-500/40 rounded-xl border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                <Star />
                                Featured
                            </ToggleGroupItem>
                        </ToggleGroup>
               
                </div>
            </div>
                
            <div className="flex min-h-0 grow gap-3 flex-col divide-y divide-border overflow-y-auto rounded-xl border bg-muted/30 px-4">
                {!isPending && 
                filtered.map(post => (
                    <BlogListItem key={post.slug} post={post} activeTag="" admin></BlogListItem>
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