import { cn, StFilmByStYear } from "@/lib/utils";
import StPoster from "./st-poster";

export default function StCalendarSquare({ film, slotNum, onSelect } : { film: StFilmByStYear | null; slotNum: number; onSelect: (id:number) => void }) {

    const border = `${film ? film.active ? '-2 border-orange-500' : '-2' : '-2'}`
    return (

        <div 
        className={cn("relative aspect-square border-2 -mt-px -ml-px",
            film?.active && "border-orange-500 z-10")}>
            <span className="absolute top-1 left-1 text-xs text-foreground/70">{slotNum}</span>
            <button
            type="button" 
            onClick={film ? () => onSelect(film.tmdbId) : undefined} 
            className="flex h-full w-full items-center justify-center transition-transform duration-300 enabled:hover:scale-105">
                { film ?
                <StPoster
                img={film.poster}
                title={film.title}
                className="w-[60%] lg:w-[62%]"/>
                :
                <StPoster
                className="w-[45%] lg:w-[55%]"/>
                }
            </button>
        </div>
    )
}