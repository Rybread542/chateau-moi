import { FilmDetails } from "@/db/st-films";
import StPoster from "./st-poster";

export default function StFilmDetailsDisplay({ film } : { film: FilmDetails | null }) {

    if (!film) {
        return (
             <div className="flex w-full flex-col gap-6 rounded-lg border bg-card p-4 sm:p-6 mt-[30px]">
                 <p className="py-24 text-center text-muted-foreground">Click on a mobie.</p>
             </div>
        )
    }

    return (
        <div className="flex w-full flex-col gap-6 rounded-lg border bg-card p-4 sm:p-6 mt-[30px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <StPoster 
                img={film.poster_path}
                title={film.original_title}
                className="w-40 shrink-0 self-start sm:self-center sm:w-48 sm:self-start"
                />

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-2xl leading-tight font-bold text-balance">{film.original_title}</h2>
                        <p className="text-base text-muted-foreground">{film.release_date.slice(0,4)}</p>
                        <p className="text-sm text-muted-foreground"> Directed by {film.director.join(', ')} | {film.runtime}m </p>
                    </div>
                    <p className="overflow-y-auto max-h-49 flex-1 rounded-md bg-muted p-3 text-sm leading-relaxed">{film.overview}</p>
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                    Cast
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2 flex-wrap sm:flex-nowrap overflow-y-auto sm:overflow-y-none h-48 sm:h-auto justify-center sm:justify-start">
                    {film.cast.map(member => (
                        <div key={member.id} className="w-24 shrink-0">
                            <div className="aspect-square overflow-hidden rounded-sm bg-muted">
                                <img
                                    loading="lazy"
                                    src={member.profile_path}
                                    alt={member.name}
                                    className="h-full w-full object-cover object-center"/>
                            </div>
                            <p className="mt-2 line-clamp-2 text-xs leading-snug font-medium">{member.name}</p>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{member.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}