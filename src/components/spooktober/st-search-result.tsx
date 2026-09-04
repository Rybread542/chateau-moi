import StPoster from "./st-poster";
import { 
    Item, 
    ItemContent, 
    ItemDescription, 
    ItemMedia, 
    ItemTitle 
} from "../ui/item";
import type { SearchDisplayFilm } from "@/lib/utils"

type StResultProps = {
    film: SearchDisplayFilm;
    selected: boolean;
    onSelect: (film: SearchDisplayFilm) => void;
}

export default function StSearchResult( { film, selected, onSelect } : StResultProps ) {

    return(
        <Item variant={'outline'} 
            className={`h-[200px] items-stretch hover:bg-muted hover:cursor-pointer ${selected ? 'bg-muted border-primary' : ''}`} 
            onClick={() => {onSelect(film)}}>
            <ItemMedia>
                <StPoster
                img={film.poster}
                title={film.title}
                className="w-24 sm:w-28"
                />
            </ItemMedia>
            <ItemContent className="gap-1">
                <ItemTitle>
                    {film.title}
                </ItemTitle>
                <ItemDescription>
                    {film.year}
                </ItemDescription>
                <ItemDescription className="min-h-0 max-h-32 overflow-y-auto line-clamp-none">
                    {film.overview}
                </ItemDescription>
            </ItemContent>
        </Item>
    )
}