import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getPageParams, getPaginateItems } from "@/lib/utils";
import { Item } from "./ui/item";
import { FastForward, Rewind, SkipBack, SkipForward } from "lucide-react";


export function Paginate({ totalPages, currPage, searchParams, mode }
    :{ 
        totalPages: number; 
        currPage: number; 
        searchParams: Record<string, string | undefined>;
        mode: 'index' | 'search'
    }) {

  if (totalPages < 1) return null

  const paginateItems = getPaginateItems(currPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>

        {(currPage > 1) && (totalPages > 3) &&
          <PaginationItem>
             <PaginationLink href={getPageParams(1, searchParams, mode)} >
                <Rewind />
              </PaginationLink>
          </PaginationItem>
        }

        {(currPage > 1) && (totalPages > 3) &&
          <PaginationItem>
             <PaginationLink href={getPageParams(currPage-1, searchParams, mode)} >
                <SkipBack />
              </PaginationLink>
          </PaginationItem>
        }

        {paginateItems.map((item, i) =>
                (
                <PaginationItem key={item}>
                    <PaginationLink href={getPageParams(item, searchParams, mode)} isActive={item === currPage}>
                        {item}
                    </PaginationLink>
                </PaginationItem>
                )
            )
        }

        {(currPage != totalPages) && (totalPages > 3) &&
          <PaginationItem>
             <PaginationLink href={getPageParams(currPage+1, searchParams, mode)} >
                <SkipForward />
              </PaginationLink>
          </PaginationItem>
        }

        {(currPage < totalPages) && (totalPages > 3) &&
          <PaginationItem>
             <PaginationLink href={getPageParams(totalPages, searchParams, mode)} >
                <FastForward />
              </PaginationLink>
          </PaginationItem>
        }

      </PaginationContent>
    </Pagination>
  )
}
