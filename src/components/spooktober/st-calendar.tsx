import StCalendarSquare from "./st-calendar-square";
import StPoster from "./st-poster";
import { StFilmByStYear } from "@/lib/utils";


export default function StCalendar( { films, onSelect } : { films: StFilmByStYear[], onSelect: (id: number) => void } ) {

    const filmSlotMap = new Map(films.map(film => [film.slot, film]))
    const gridSlots = Array.from ({ length: 31 }, (_, idx) => {
        const slotNbr = idx + 1
        return {slotNbr, film: filmSlotMap.get(slotNbr) ?? null}
    })

    const hWeen = gridSlots.pop()
    const hWeenFilm = hWeen?.film ?? null

    return(
        <div className="rounded-sm border bg-card p-2 w-full">
            <div className="grid grid-cols-5 border-2 bg-muted-foreground/20 w-full">
                {gridSlots.map(slot => (
                    <StCalendarSquare
                    key={slot.slotNbr}
                    film={slot.film}
                    slotNum={slot.slotNbr}
                    onSelect={onSelect}/>
                ))}

                <div className="grid col-span-full place-items-center p-2">
                    <button
                    type="button" 
                    disabled={!hWeenFilm}
                    onClick={hWeenFilm ? () => onSelect(hWeenFilm.tmdbId) : undefined} 
                    className="w-30 sm:w-36 transition-transform duration-300 enabled:hover:scale-105">
                        <StPoster 
                        img={hWeenFilm?.poster} 
                        title={hWeenFilm?.title}/>
                    </button>
                </div>

            </div>
        </div>
    )
}