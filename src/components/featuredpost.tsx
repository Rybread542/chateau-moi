import Link from "next/link";
import Image from "next/image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { PublishedPost } from "@/lib/utils";

export default function FeaturedPost({ post } : { post: PublishedPost }) {

    return(
        <Item className="w-full flex-col items-stretch gap-4 rounded-xl border border-primary/12 bg-card p-4 shadow-[0_0_40px_-16px] shadow-primary/25">
            <p className="text-[11px] font-medium tracking-widest text-chart-1">
                check this one out
            </p>
            <ItemHeader>
                <ItemMedia variant={'image'} className="relative w-full h-48 overflow-hidden rounded-lg">
                    <Image src={'/default.png'} alt="yes" fill className="object-cover"></Image>
                </ItemMedia>
            </ItemHeader>
            <ItemContent className="gap-2">
                <ItemTitle className="text-xl font-semibold tracking-tight lg:text-2xl">
                    <Link className="transition-colors hover:text-primary hover:underline underline-offset-4" href={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                </ItemTitle>
                <ItemDescription className="line-clamp-none text-sm">
                    {post.description}
                </ItemDescription>
                <ItemDescription className="text-xs">
                    {post.publishedAt!.toLocaleDateString()}
                </ItemDescription>
            </ItemContent>
        </Item>
    )
}