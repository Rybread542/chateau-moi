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
import type { AdminPost } from "@/lib/utils";
import {CircleX, CircleCheck, Star } from "lucide-react";

type AdminView = AdminPost

type ListView = {
    variant: 'list';
    slug: string;
    title: string;
    excerpt: string | null;
    featured: boolean;
    description: string;
    publishedAt: Date | null;
}

type PostProps = AdminView | ListView

export default function BlogListItem(post: PostProps) {

    const link = post.variant === 'list' ? `/blog/${post.slug}` : '#'

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
                </ItemContent>
                {post.variant === 'admin' &&    
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