"use client"
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
import type { Post, PublishedPost } from "@/lib/utils";
import {CircleX, CircleCheck, Star } from "lucide-react";
import TagBox from "./tag-box";

type PostProps = Post | PublishedPost

export default function BlogListItem({post, activeTag, admin} : { post: PostProps; activeTag: string; admin: boolean}) {

    const link = `/blog/${post.slug}`

    return(
        <Item variant={'outline'} className="h-full w-full gap-8">
                <ItemMedia variant={'image'}>
                    <Image src={'/default.png'} alt="yes" fill className=""></Image>
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>
                        <Link href={link}>
                            {post.title}
                        </Link>
                    </ItemTitle>
                    <ItemDescription>
                        {post.description}
                    </ItemDescription>
                    <ItemDescription>
                        {post.publishedAt ? post.publishedAt.toLocaleDateString() : "Unpublished"}
                    </ItemDescription>
                    <TagBox tags={post.tags} activeTag={activeTag}/>
                </ItemContent>

                

                {admin &&   
                <>
                <div className="flex flex-col gap-1">
                    {post.featured && 
                        <Badge variant={'outline'} className="bg-indigo-200 w-full">
                            <Star data-icon="inline-start"/>
                            Featured
                        </Badge>}

                    {post.published && 
                        <Badge variant={'outline'} className="bg-emerald-200 w-full">
                            <CircleCheck data-icon="inline-start"/>
                            Published
                        </Badge>}

                    {!post.published && 
                        <Badge variant={'outline'} className="bg-red-200 w-full">
                            <CircleX data-icon="inline-start"/>
                            Unpublished
                        </Badge>} 
                </div>

                    <PostAdminInfo post={post} />
                    <ItemActions>
                        <AdminDropdown post={post} />
                    </ItemActions>
                </>
                    
                }
        </Item>
    )
}