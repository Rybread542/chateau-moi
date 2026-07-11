import Image from "next/image";
import { Badge } from "./ui/badge";
import { Item, 
        ItemMedia, 
        ItemContent, 
        ItemTitle, 
        ItemDescription } from "./ui/item";
import { Project } from "@/app/projects/projects.data";

export default function ProjectCard({ project } : {project: Project}) {

return (
    <Item variant={'outline'} className="relative w-full flex-col items-stretch gap-5 rounded-xl  transition-colors hover:border-primary/30 sm:flex-row sm:gap-6">
        <ItemMedia variant={'image'} className="relative aspect-video size-30 w-full shrink-0 overflow-hidden rounded-lg sm:aspect-square sm:size-44 lg:size-52" >
            <Image src={project.image} alt="yes" sizes="(min-width: 640px) 208px, 100vw" fill className="object-cover" />
        </ItemMedia>
        <ItemContent className="min-w-0 justify-between gap-3 py-1">
            <ItemTitle className="">
                <a href={project.href} className="text-xl font-semibold tracking-tight after:absolute after:inset-0 sm:text-2xl">
                    {project.title}
                </a>
            </ItemTitle>
            <ItemDescription className="line-clamp-3 text-sm">
               {project.description}
            </ItemDescription>
            
            <div className="flex flex-wrap gap-2">
                {project.stack.map(item => 
                    <Badge key={item} variant={"secondary"}>{item}</Badge>
                )}
            </div>

        </ItemContent>
    </Item>
    )
}