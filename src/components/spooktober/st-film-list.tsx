"use client";
import { StFilmByStYear } from "@/lib/utils";
import { useMemo, useState } from "react";
import StFilmListItem from "./st-film-list-item";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { StSubmitDialog } from "./st-submit-dialog";
import StFilmRollDialog from "./st-film-list-roll-dialog";


const ANY = ''

const titleCollator = new Intl.Collator("en", {
    sensitivity: 'base',
    numeric: true
})

const SORT_COMPARATORS = { 
    "title-asc": (filmA, filmB) => titleCollator.compare(filmA.title, filmB.title),
    "title-desc": (filmA, filmB) => titleCollator.compare(filmB.title, filmA.title),

    "releaseYear-asc": (filmA, filmB) =>
    filmA.releaseYear - filmB.releaseYear ||
    titleCollator.compare(filmA.title, filmB.title),

    "releaseYear-desc": (filmA, filmB) =>
    filmB.releaseYear - filmA.releaseYear ||
    titleCollator.compare(filmA.title, filmB.title),

    "newest-submitted": (filmA, filmB) =>
    filmB.createdAt.getTime() - filmA.createdAt.getTime() ||
    titleCollator.compare(filmA.title, filmB.title),

    "most-submitted": (filmA, filmB) =>
    filmB.count - filmA.count,

    "": (filmA, filmB) =>
    filmB.createdAt.getTime() - filmA.createdAt.getTime() ||
    titleCollator.compare(filmA.title, filmB.title),

}  satisfies Record<string, (a: StFilmByStYear, b: StFilmByStYear) => number>

type SortKey = keyof typeof SORT_COMPARATORS

export default function StFilmList({ films, onSelect, user } : { films: StFilmByStYear[]; onSelect: (id: number) => void; user: string }) {

    const [ filterSubmittedBy, setFilterSubmittedBy ] = useState<string>(ANY)
    const [ filterApproval, setFilterApproval ] = useState<string>(ANY)
    const [ filterStYear, setFilterStYear ] = useState<string>(ANY)
    const [ filtering, setFiltering ] = useState(false)
    const [ sortKey, setSortKey ] = useState<SortKey>('')

    const stYearOptions = useMemo(
        () => [...new Set(films.map((film) => film.stYear))].sort((a, b) => b-a),
        [films]
        )
    
    const submittedByOptions = useMemo(
        () => [...new Set(films.flatMap((film) => film.submittedBy))].sort((a, b) => titleCollator.compare(a,b)),
        [films]
    )

    const displayedFilms = useMemo(() => {
        
        const matching = films.filter(film => {
            if (filterStYear !== ANY && film.stYear !== Number(filterStYear)) {
                return false
            }

            if (filterSubmittedBy !== ANY &&
                !film.submittedBy.includes(filterSubmittedBy)
            ) {
                return false
            }

            if (filterApproval !== ANY &&
                film.approved !== (filterApproval === 'true')
            ) {
                return false
            }
            
            return true
        })
       
        return matching.sort(SORT_COMPARATORS[sortKey])
    }, [films, filterApproval, filterStYear, filterSubmittedBy, sortKey])

    const resetFilters = () => {
        setFilterApproval(ANY)
        setFilterStYear(ANY)
        setFilterSubmittedBy(ANY)
        setSortKey('')
    }


    return (
        <div className="flex flex-col rounded-sm border bg-card px-4 py-2 gap-2 w-full">
            <div className="flex flex-wrap items-center gap-1 justify-start">
                <Select value={filterSubmittedBy} onValueChange={setFilterSubmittedBy}>
                    <SelectTrigger className="w-full sm:w-44 rounded-sm">
                        <SelectValue placeholder="Submitted by" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="rounded-sm">
                        <SelectGroup>
                            <SelectItem value={ANY}>All</SelectItem>
                            {submittedByOptions.map(name => (
                                <SelectItem key={name} value={name}>{name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                    <SelectTrigger className="w-full sm:w-44 rounded-sm">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="rounded-sm" >
                        <SelectGroup>
                            
                            <SelectItem value={'newest-submitted'}>Added recently</SelectItem>
                            <SelectItem value={'title-asc'}>{`Title (A-Z)`}</SelectItem>
                            <SelectItem value={'title-desc'}>{`Title (Z-A)`}</SelectItem>
                            <SelectItem value={'releaseYear-desc'}>{`Year (newest)`}</SelectItem>
                            <SelectItem value={'releaseYear-asc'}>{`Year (oldest)`}</SelectItem>
                            <SelectItem value={'most-submitted'}>{`Most submitted`}</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>

                {user !== 'guest' &&
                <div className="ml-auto">
                    <StSubmitDialog user={user} />
                </div>
                }
                {user === 'rybread' &&
                    <StFilmRollDialog 
                    films={films}/>
                }
            </div>
            
            <div className="flex flex-1 gap-3 flex-wrap max-h-[82vh] overflow-y-auto rounded-sm border bg-muted p-4">
                {displayedFilms.map(film => (
                    <StFilmListItem
                    key={film.id}
                    film={film}
                    onSelect={onSelect}/>
                ))}
            </div>
        </div>

    )

}