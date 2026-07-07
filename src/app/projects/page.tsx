import MainShell from "@/components/main-shell";
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import Image from "next/image";
import Link from "next/link";




export default async function Projects() {

    

  return (
      <MainShell>
           <header className="mb-8 flex flex-col gap-1">
                <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
                <p className="text-sm text-muted-foreground">maybe</p>
            </header>
           <div className="flex flex-col flex-1 gap-8 p-10">
                <Item variant={'outline'} className="relative w-full flex-col items-stretch gap-5 rounded-xl p-4 transition-colors hover:border-primary/30 sm:flex-row sm:gap-6">
                    <ItemMedia variant={'image'} className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg sm:aspect-square sm:size-44 lg:size-52" >
                        <Image src={'/default.png'} alt="yes" fill className="object-cover"></Image>
                    </ItemMedia>
                    <ItemContent className="min-w-0 justify-between gap-3 py-1">
                        <ItemTitle className="">
                            <Link href={'#'} className="text-xl font-semibold tracking-tight after:absolute after:inset-0 sm:text-2xl">
                                Lorem Ipsum
                            </Link>
                        </ItemTitle>
                        <ItemDescription className="line-clamp-3 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in impedit minima et unde culpa dignissimos vero, molestias similique molestiae saepe distinctio consectetur tenetur assumenda.
                        </ItemDescription>
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Next.js</Badge>
                            <Badge variant="secondary">TypeScript</Badge>
                            <Badge variant="secondary">Postgres</Badge>
                        </div>

                    </ItemContent>
                </Item>

                <Item variant={'outline'} className="relative w-full flex-col items-stretch gap-5 rounded-xl p-4 transition-colors hover:border-primary/30 sm:flex-row sm:gap-6">
                    <ItemMedia variant={'image'} className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg sm:aspect-square sm:size-44 lg:size-52" >
                        <Image src={'/default.png'} alt="yes" fill className="object-cover"></Image>
                    </ItemMedia>
                    <ItemContent className="min-w-0 justify-between gap-3 py-1">
                        <ItemTitle className="">
                            <Link href={'#'} className="text-xl font-semibold tracking-tight after:absolute after:inset-0 sm:text-2xl">
                                Lorem Ipsum
                            </Link>
                        </ItemTitle>
                        <ItemDescription className="line-clamp-3 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in impedit minima et unde culpa dignissimos vero, molestias similique molestiae saepe distinctio consectetur tenetur assumenda.
                        </ItemDescription>
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Next.js</Badge>
                            <Badge variant="secondary">TypeScript</Badge>
                            <Badge variant="secondary">Postgres</Badge>
                        </div>

                    </ItemContent>
                </Item>
           </div>
      </MainShell>
    
  );
}
