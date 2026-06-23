import Image from "next/image";
import NavButton from "@/components/navbutton";
import FeaturedPost from "@/components/featuredpost";

import Link from "next/link";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";


export default function Blog() {
  const filler = [
    {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, reprehenderit!',
        slug: 'lorem-ipsum-dolor-sit-amet1',
        publishedAt: '06/07/2026'
    },
    {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, reprehenderit!',
        slug: 'lorem-ipsum-dolor-sit-amet2',
        publishedAt: '06/06/2026'
    },
    {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, reprehenderit!',
        slug: 'lorem-ipsum-dolor-sit-amet3',
        publishedAt: '06/05/2026'
    },
    {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, reprehenderit!',
        slug: 'lorem-ipsum-dolor-sit-amet4',
        publishedAt: '06/04/2026'
    },
  ]

  return (
      <main className="flex flex-col grow px-4 py-12">
           <div className="mx-auto text-3xl">Blog</div>
           <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 min-w-0 my-4">
                    <FeaturedPost text="yes"></FeaturedPost>
                </div>
                <aside></aside>
           </div>
           <div className="text-left text-xl">
                More posts
           </div>
           <div className="flex flex-col gap-4">
                {filler.map(post => (
                    <Item key={post.slug} variant={'outline'} className="h-full w-full" asChild>
                        <Link href={'/blog/' + post.slug}>
                            <ItemMedia variant={'image'}>
                                <Image src={'/default.png'} alt="yes" fill className=""></Image>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>
                                    {post.title}
                                </ItemTitle>
                                <ItemDescription>
                                    {post.description}
                                </ItemDescription>
                                <ItemDescription>
                                    {post.publishedAt}
                                </ItemDescription>
                            </ItemContent>
                        </Link>
                    </Item>
                ))}
           </div>
      </main>
    
  );
}
