import { Badge } from "./ui/badge"
import { HoverCard, 
        HoverCardContent,
        HoverCardTrigger, } from "./ui/hover-card"

export default function TagBox({ tags, activeTag } : { tags: string[], activeTag: string }) {

    const tagLen = tags.length

    return(
        
        <div className="flex w-50 gap-2">
            {tags.slice(0,3).map(tag => 
                <Badge key={tag} variant={tag === activeTag ? 'default' : 'outline'}>
                    {tag}
                </Badge>
            )}
        {tagLen > 3 &&
            <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Badge variant={'outline'}> 
                        {`+${tagLen - 3}`}
                    </Badge>
                </HoverCardTrigger>

                <HoverCardContent side={'bottom'} className="w-full">

                    <div className="flex flex-wrap gap-2">
                        {tags.slice(3).map(tag => 
                            <Badge key={tag} variant={'outline'}>
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