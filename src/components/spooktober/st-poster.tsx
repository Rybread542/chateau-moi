import { cn } from "@/lib/utils";

type PosterProps = {
    img?: string | null;
    title?: string | null;
    className?: string; 
}

const TMDB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w342'
const PLACEHOLDER = '/qmark.png'

export default function StPoster({ img, title, className }: PosterProps) {
    const imgUrl = img ? `${TMDB_POSTER_BASE_URL}${img}` : PLACEHOLDER;

    return (
        <div className={cn("aspect-[2/3] w-full overflow-hidden bg-white", className)}>
            <img
                src={imgUrl}
                alt={title ?? '?'}
                loading="lazy"
                className="h-full w-full object-cover" />
        </div>
    );
}