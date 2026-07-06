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
        <Item className="w-full">
            <div className="text-[10px]">Check this one out</div>
            <ItemHeader>
                <ItemMedia variant={'image'} className="relative h-60 w-full rounded-sm">
                    <Image src={'/default.png'} alt="yes" fill className="object-cover"></Image>
                </ItemMedia>
            </ItemHeader>
            <ItemContent>
                <ItemTitle className="sm:text-2xl md:text-3xl lg:text-4xl">
                    <Link href={`/blog/${post.slug}`}>
                        {post.title}
                    </Link>
                </ItemTitle>
                <ItemDescription className="line-clamp-none text-lg">
                    {post.description}
                </ItemDescription>
                <ItemDescription className="text-sm">
                    {post.publishedAt!.toLocaleDateString()}
                </ItemDescription>
            </ItemContent>
        </Item>
    )
}