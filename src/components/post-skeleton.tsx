import { Skeleton } from "./ui/skeleton";

export default function BlogPostSkeleton() {

    return(
    <>
    {
    Array.from({ length: 4 }).map((i, idx) =>
        <div key={idx} className="w-full items-start gap-4 px-4 py-6 sm:gap-6 flex">
            <Skeleton className="h-full w-12 rounded-md" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] flex-1" />
                <Skeleton className="h-4 w-[200px] flex-1" />
            </div>
        </div>
    )}
    </>
    )
}