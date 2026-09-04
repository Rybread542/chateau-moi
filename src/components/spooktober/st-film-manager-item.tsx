import { StFilmByStYear } from "@/lib/utils"
import StPoster from "./st-poster"

export default function StFilmManagerItem({ film, onSelect, count } 
    : { 
        film: StFilmByStYear; 
        onSelect: (film: StFilmByStYear) => void ,
        count: number
    }
    ) {


    return(
        <button
        type="button" 
        onClick={() => onSelect(film)} 
        className="flex flex-col gap-1 transition-transform duration-300 ease-in-out hover:scale-105">
            <StPoster
            img={film.poster}
            title={film.title}
            className="w-24 sm:w-28"
            />
            <div className="flex justify-evenly">
                <div className="flex flex-col w-24">
                    <p className="text-xs">{film.title}</p>
                    <p className="text-xs text-muted-foreground">{film.releaseYear}</p>
                </div>
                <p className="text-xs text-primary font-bold">x{count}</p>
            </div>
        </button>
    )
}