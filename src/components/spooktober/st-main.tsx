"use client";
import { StFilmByStYear } from "@/lib/utils";
import StCalendar from "./st-calendar";
import { useState, useTransition } from "react";
import { getFilmDetails, type FilmDetails } from "@/db/st-films";
import StFilmDetailsDisplay from "./st-film-details-display";
import StFilmDetailsSkeleton from "./st-film-details-skeleton";
import StFilmList from "./st-film-list";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"


type View = 'calendar' | 'list'


export default function SpooktoberMain({ films, active, user } 
:  { films: StFilmByStYear[]; active: FilmDetails | null; user: string }) {

    const [ displayed, setDisplayed ] = useState<FilmDetails | null>(active)
    const [ isFetching, startFetchTransition ] = useTransition()
    const [ viewToggle, setViewToggle ] = useState<View>('calendar')

    const listFilms = films.filter(film => (film.approved && !film.slot))

    const handleDisplayUpdate = (id: number) => {
        if (displayed?.id === id) return
        startFetchTransition(async () => {
            const details = await getFilmDetails(id)
            setDisplayed(details)
        })
    }

    return (
            <div className="flex flex-wrap items-start justify-center gap-4">
                
                <div className="w-full max-w-3xl shrink-0 grow basis-96">
                    <div className="flex">
                        <ToggleGroup 
                        variant="outline" 
                        type="single" 
                        value={viewToggle}
                        onValueChange={(v: View) => setViewToggle(v)}
                        className="ml-2">
                            <ToggleGroupItem 
                            value="calendar"
                            disabled={viewToggle === 'calendar'}
                            className="border-b-0 disabled:opacity-100 rounded-t-sm -mb-[1px] data-[state=on]:bg-card data-[state=on]:z-3">
                            Calendar
                            </ToggleGroupItem>
                            <ToggleGroupItem 
                            value="list"
                            disabled={viewToggle === 'list'}
                            className="border-b-0 disabled:opacity-100 rounded-t-sm -mb-[1px] data-[state=on]:bg-card data-[state=on]:z-3">
                            Film List
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    {viewToggle === 'calendar' && 
                    <StCalendar
                    films={films}
                    onSelect={handleDisplayUpdate} />
                    }

                    {viewToggle === 'list' && 
                    <StFilmList films={listFilms}
                    onSelect={handleDisplayUpdate}
                    user={user}/>
                    }
                </div>

                <div className="w-full max-w-lg min-w-0 grow basis-96">
                    {isFetching ? 
                    <StFilmDetailsSkeleton /> 
                    : 
                    <StFilmDetailsDisplay film={displayed}/>
                    }
                </div>
                
            </div>

    )
}