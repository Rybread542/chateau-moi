import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import Image from "next/image";
import Link from "next/link";




export default async function Projects() {

    

  return (
      <main className="flex flex-col grow px-20 py-12">
           <div className="mx-auto text-3xl">Projects</div>
           <div className="flex flex-col flex-1 gap-8 p-10">
                <Item variant={'outline'} className="w-full gap-4 px-6 relative flex-nowrap items-stretch">
                    <ItemMedia variant={'image'} className="relative size-64 shrink-0 overflow-hidden" >
                        <Image src={'/default.png'} alt="yes" fill className="object-cover"></Image>
                    </ItemMedia>
                    <ItemContent className="justify-evenly">
                        <ItemTitle className="">
                            <Link href={'#'} className="text-3xl after:absolute after:inset-0">
                                Lorem Ipsum
                            </Link>
                        </ItemTitle>
                        <ItemDescription className="line-clamp-5 text-[14px] bg-muted/50 px-5 py-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in impedit minima et unde culpa dignissimos vero, molestias similique molestiae saepe distinctio consectetur tenetur assumenda.
                        </ItemDescription>
                        
                        <div className="flex flex-wrap gap-4">
                            <Badge variant="secondary">Next.js</Badge>
                            <Badge variant="secondary">TypeScript</Badge>
                            <Badge variant="secondary">Postgres</Badge>
                        </div>

                    </ItemContent>
                </Item>

                <Item variant={'outline'} className="w-full gap-4 px-6 relative flex-nowrap items-stretch">
                    <ItemMedia variant={'image'} className="relative size-64 shrink-0 overflow-hidden" >
                        <Image src={'/default.png'} alt="yes" fill className="object-cover"></Image>
                    </ItemMedia>
                    <ItemContent className="justify-evenly">
                        <ItemTitle className="">
                            <Link href={'#'} className="text-3xl after:absolute after:inset-0">
                                Lorem Ipsum
                            </Link>
                        </ItemTitle>
                        <ItemDescription className="line-clamp-4 text-[14px] bg-muted/50 px-5 py-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in impedit minima et unde culpa dignissimos vero, molestias similique molestiae saepe distinctio consectetur tenetur assumenda.
                        </ItemDescription>
                        
                        <div className="flex flex-wrap gap-4">
                            <Badge variant="secondary">Next.js</Badge>
                            <Badge variant="secondary">TypeScript</Badge>
                            <Badge variant="secondary">Postgres</Badge>
                        </div>

                    </ItemContent>
                </Item>
           </div>
      </main>
    
  );
}
