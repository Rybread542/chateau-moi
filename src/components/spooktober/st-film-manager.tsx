"use client"
import type { StFilmByStYear } from "@/lib/utils";
import { useMemo, useState } from "react";
import StFilmManagerItem from "./st-film-manager-item";
import { StFilmAdminDialog } from "./st-film-admin-dialog";
import { Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "../ui/select";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ApproveAllAdminDialog } from "./st-film-admin-approve-all-dialog";

const ANY = 'All'

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
    filmB.count - filmA.count

}  satisfies Record<string, (a: StFilmByStYear, b: StFilmByStYear) => number>

type SortKey = keyof typeof SORT_COMPARATORS

export default function STFilmManager({ films } : { films: StFilmByStYear[] } ) {

    const [ selectedFilm, setSelectedFilm ] = useState<StFilmByStYear | null>(null)
    const [ filterSubmittedBy, setFilterSubmittedBy ] = useState<string>(ANY)
    const [ filterApproval, setFilterApproval ] = useState<string>(ANY)
    const [ filterStYear, setFilterStYear ] = useState<string>(ANY)
    const [ sortKey, setSortKey ] = useState<SortKey>('newest-submitted')

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
        setSortKey('newest-submitted')
    }

    return(
        <>   
            <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-1 justify-start rounded-lg bg-muted/50 p-2">
                    <div className="flex flex-col">
                        <p className="text-xs text-muted-foreground">Submitted by</p>
                        <Select value={filterSubmittedBy} onValueChange={setFilterSubmittedBy}>
                            <SelectTrigger className="w-[180px] rounded-sm">
                                <SelectValue placeholder="Submitted by" />
                            </SelectTrigger>
                            <SelectContent position="popper" className="rounded-sm">
                                <SelectGroup>
                                    <SelectItem value={ANY}>{ANY}</SelectItem>
                                    {submittedByOptions.map(name => (
                                        <SelectItem key={name} value={name}>{name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-xs text-muted-foreground">Season</p>
                        <Select value="2026" onValueChange={setFilterStYear}>
                            <SelectTrigger className="w-[90px] rounded-sm">
                                <SelectValue placeholder="ST Year" />
                            </SelectTrigger>
                            <SelectContent position="popper" className="rounded-sm" >
                                <SelectGroup>
                                    {stYearOptions.map(year => (
                                        <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-xs text-muted-foreground">Approved</p>
                        <Select value={filterApproval} onValueChange={setFilterApproval}>
                            <SelectTrigger className="w-[120px] rounded-sm">
                                <SelectValue placeholder="ST Year" />
                            </SelectTrigger>
                            <SelectContent position="popper" className="rounded-sm" >
                                <SelectGroup>
                                    <SelectItem value={ANY}>{ANY}</SelectItem>
                                    <SelectItem value={'true'}>Approved</SelectItem>
                                    <SelectItem value={'false'}>Unapproved</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-xs text-muted-foreground">Sort By</p>
                        <Select defaultValue="newest-added" value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                            <SelectTrigger className="w-[180px] rounded-sm">
                                <SelectValue placeholder="ST Year" />
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
                    </div>
                    
                    <div className="flex gap-1 self-center ml-auto">
                        <Button variant={'default'} onClick={resetFilters} className="rounded-sm">
                            <X className="text-muted"/> Reset Filters
                        </Button>
                        <ApproveAllAdminDialog/>
                    </div>
                </div>
            </div>
            <div className="flex min-h-0 grow gap-3 flex-wrap overflow-y-auto rounded-lg border bg-muted/30 px-4 py-4">
                {displayedFilms.map(film => (
                    <StFilmManagerItem
                    key={film.id}
                    film={film}
                    onSelect={setSelectedFilm} 
                    count={film.submittedBy.length}
                    />
                ))}
            </div>
            
            {selectedFilm &&
                <StFilmAdminDialog
                film={selectedFilm} 
                onClose={() => setSelectedFilm(null)}/>
            }
            
        </>
    )
}