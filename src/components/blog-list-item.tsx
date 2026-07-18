import Link from "next/link";
import Image from "next/image";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import AdminDropdown from "./blog-list-item-admin-dropdown";
import { PostAdminInfo } from "./blog-list-item-admin-info";
import { Badge } from "./ui/badge";
import { formatDate, type Post, type PublishedPost } from "@/lib/utils";
import {CircleX, CircleCheck, Star } from "lucide-react";
import TagBox from "./tag-box";

type PostProps = Post | PublishedPost

export default function BlogListItem({post, activeTag, admin} : { post: PostProps; activeTag: string; admin: boolean}) {

    const link = `/blog/${post.slug}`

    return(
        <Item variant={admin ? 'outline' : 'default'} className="w-full items-start gap-4 px-0 py-6 sm:gap-6">
            <ItemMedia variant={'image'} className="relative size-20 shrink-0 overflow-hidden rounded-lg sm:size-32">
                <Image src={post.image} sizes="(min-width: 640px) 128px, 80px" alt="yes" fill className="object-cover"></Image>
            </ItemMedia>
            <ItemContent className="min-w-0 gap-2">
                <ItemTitle className="text-lg font-semibold tracking-tight sm:text-xl">
                    <Link href={link} className="transition-colors hover:text-primary hover:underline underline-offset-4">
                        {post.title}
                    </Link>
                </ItemTitle>
                <ItemDescription className="line-clamp-2 text-sm sm:line-clamp-3">
                    {post.description}
                </ItemDescription>

                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <ItemDescription className="text-xs">
                        {post.publishedAt ? formatDate(post.publishedAt) : "Unpublished"}
                    </ItemDescription>
                    <TagBox tags={post.tags} activeTag={activeTag}/>
                </div>
            </ItemContent>

            

            {admin &&   
            <>
            <div className="flex flex-col gap-1">
                {post.featured && 
                    <Badge variant={'outline'} className=" hover:bg-indigo-500/40 data-[state=on]:bg-indigo-500/40 rounded-xl border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <Star data-icon="inline-start"/>
                        Featured
                    </Badge>}

                {post.published && 
                    <Badge variant={'outline'} className="hover:bg-emerald-600/40 data-[state=on]:bg-emerald-600/40 rounded-xl border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <CircleCheck data-icon="inline-start"/>
                        Published
                    </Badge>}

                {!post.published && 
                    <Badge variant={'outline'} className="hover:bg-red-500/40 data-[state=on]:bg-red-500/40 rounded-xl border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400">
                        <CircleX data-icon="inline-start"/>
                        Unpublished
                    </Badge>} 
            </div>

                <PostAdminInfo post={post} />
                <ItemActions className="mr-8">
                    <AdminDropdown post={post} />
                </ItemActions>
            </>
                
            }
        </Item>
    )
}