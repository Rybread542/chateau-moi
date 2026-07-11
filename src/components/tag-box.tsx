import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"
import { HoverCard, 
        HoverCardContent,
        HoverCardTrigger, } from "./ui/hover-card"

export default function TagBox({ tags, activeTag } : { tags: string[], activeTag: string }) {

    const tagLen = tags.length

    return(
        
        <div className="flex flex-wrap items-center gap-1.5">
            {tags.slice(0,3).map(tag => 
                <Badge className={cn(
                        "rounded-xl",
                        tag !== activeTag && "border-primary/25 bg-primary/10 text-primary"
                        )} 
                        key={tag} 
                        variant={tag === activeTag ? 'default' : 'outline'}>
                    {tag}
                </Badge>
            )}
        {tagLen > 3 &&
            <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Badge variant={'outline'} className="rounded-full border-primary/25 bg-primary/30 text-indigo-300"> 
                        {`+${tagLen - 3}`}
                    </Badge>
                </HoverCardTrigger>

                <HoverCardContent side={'bottom'} className="w-full">

                    <div className="flex flex-wrap gap-2">
                        {tags.slice(3).map(tag => 
                            <Badge key={tag} variant={'outline'} className="rounded-xl border-primary/25 bg-primary/10 text-indigo-300">
                                {tag}
                            </Badge>
                        )}
                    </div>
                    
                </HoverCardContent>
            </HoverCard>
        }
        </div>
    )
}