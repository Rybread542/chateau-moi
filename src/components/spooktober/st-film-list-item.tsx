import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { StFilmByStYear } from "@/lib/utils"
import StPoster from "./st-poster"

export default function StFilmListItem({ film, onSelect } 
    : { 
        film: StFilmByStYear; 
        onSelect: (id: number) => void
    }
    ) {

    return (
        <HoverCard
        openDelay={300}
        closeDelay={300}>
            <HoverCardTrigger asChild>
                <button
                type="button" 
                onClick={() => onSelect(film.tmdbId)} 
                className="flex flex-col gap-1 transition-transform duration-300 ease-in-out hover:scale-105">
                    <StPoster
                    img={film.poster}
                    title={film.title}
                    className="w-24 sm:w-28"
                    />
                    <div className="flex">
                        {film.submittedBy.map(person => (
                            <img 
                            className={`flex-0 max-h-6 ${film.submittedBy.length > 5 ? '-mr-3' : '-mr-2'}`}
                            key={person} 
                            src={`/user_dots/${person}.svg`} 
                            alt={person} />
                        ))}
                    </div>
                </button>
            </HoverCardTrigger>
            <HoverCardContent side="right" align={'start'} className="flex flex-col gap-2">
                <div className="flex flex-col w-full">
                    <p className="text-xs">{film.title}</p>
                    <p className="text-xs text-muted-foreground">{film.releaseYear}</p>
                </div>
                <div className="max-h-36 overflow-y-auto bg-border px-2 py-1 rounded-sm">
                    <p className="text-xs text-muted-foreground mb-1">Submitted by</p>
                    {film.submittedBy.map(person => (
                        <div key={person} className="flex gap-1 items-center">
                            <img src={`/user_dots/${person}.svg`} className="flex-0 max-h-8" alt={person} />
                            <p className="text-sm">{person}</p>
                        </div>
                    ))}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}