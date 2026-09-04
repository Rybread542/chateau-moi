import { Skeleton } from "../ui/skeleton";

export default function StFilmDetailsSkeleton() {

    return (
        <div className="flex w-full flex-col gap-6 rounded-lg border bg-card p-4 sm:p-6 mt-[30px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <div className={`max-w-150 sm:max-w-200 shrink-0 w-50 h-75`}>
                    <div className="aspect-[2/3] w-full overflow-hidden">
                        <Skeleton className="h-full w-full object-cover" />
                    </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <div className="flex flex-col gap-1 w-full">
                        <Skeleton className="h-6 w-2/3"/>
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                    <Skeleton className="flex-1 rounded-md bg-muted p-3" />
                </div>

            </div>
            <div className="flex gap-2 flex-col">
                <Skeleton className="w-1/5 h-4"/>
                <div className="flex justify-evenly w-full overflow-x-auto gap-4">
                    {Array.from({length: 5}).map((_, idx) => (
                        <div key={idx} className="flex flex-col w-30 shrink-0 gap-1">
                            <div className="w-full">
                                <div className="aspect-square overflow-hidden rounded-sm">
                                    <Skeleton className="h-full w-full object-cover object-center"/>
                                </div>
                            </div>
                            <Skeleton className="h-4 w-3/4"/>
                            <Skeleton className="h-4 w-2/3"/>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}