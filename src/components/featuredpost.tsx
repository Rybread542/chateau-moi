import Link from "next/link";
import Image from "next/image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { PublishedPost } from "@/lib/utils";

export default function FeaturedPost({ post } : { post: PublishedPost }) {

    return(
        <Item variant={'outline'} className="w-full" asChild>
            <Link href={`/blog/${post.slug}`}>
                <ItemMedia variant={'image'} className="size-20 sm:size-30 md:size-50 lg:size-80 aspect-square">
                    <Image src={'/default.png'} alt="yes" fill></Image>
                </ItemMedia>
                <ItemContent>
                    <ItemTitle className="sm:text-2xl md:text-3xl lg:text-4xl">
                        {post.title}
                    </ItemTitle>
                    
                    <ItemDescription className="sm:text-sm md:text-md lg:text-lg">
                        {post.publishedAt!.toLocaleDateString()}
                    </ItemDescription>
                    <ItemDescription className="line-clamp-none">
                        {post.description}
                    </ItemDescription>
                </ItemContent>
            </Link>
        </Item>
    )
}