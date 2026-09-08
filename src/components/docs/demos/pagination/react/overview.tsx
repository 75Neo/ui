import { PaginationContext } from "@ark-ui/react/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from "@/components/react";

export default function PaginationOverview() {
  return (
    <div className="flex justify-center">
      <Pagination count={128} pageSize={10} siblingCount={1}>
        <PaginationPrevTrigger aria-label="Previous page">
          <ChevronLeft />
        </PaginationPrevTrigger>

        <PaginationContext>
          {(pagination) =>
            pagination.pages.map((page, index) =>
              page.type === "page" ? (
                <PaginationItem key={index} value={page.value} type="page">
                  {page.value}
                </PaginationItem>
              ) : (
                <PaginationEllipsis key={index} index={index}>
                  &#8230;
                </PaginationEllipsis>
              ),
            )
          }
        </PaginationContext>

        <PaginationNextTrigger aria-label="Next page">
          <ChevronRight />
        </PaginationNextTrigger>
      </Pagination>
    </div>
  );
}
