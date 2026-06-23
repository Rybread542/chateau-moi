import Link from "next/link";
import Image from "next/image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface PostProps {
    text: string;
}

export default function FeaturedPost({text}: PostProps) {

    return(
        <Item variant={'outline'} className=" w-full" asChild>
            <Link href={'/#'}>
                <ItemMedia variant={'image'} className="size-20 sm:size-30 md:size-50 lg:size-80 aspect-square">
                    <Image src={'/default.png'} alt="yes" fill></Image>
                </ItemMedia>
                <ItemContent>
                    <ItemTitle className="sm:text-2xl md:text-3xl lg:text-4xl">
                        Lorem ipsum dolor sit.
                    </ItemTitle>
                    
                    <ItemDescription className="sm:text-sm md:text-md lg:text-lg">
                        06/07/2026
                    </ItemDescription>
                    <ItemDescription className="line-clamp-none">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam minima, vitae blanditiis repellendus illo sit molestiae, ipsam magni, ducimus animi illum dolore. Officia, tempora sequi?
                    </ItemDescription>
                </ItemContent>
            </Link>
        </Item>
    )
}