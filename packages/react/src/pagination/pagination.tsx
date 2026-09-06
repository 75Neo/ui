import type React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cva } from "class-variance-authority";
import {
  cn,
  paginationDefaults,
  paginationSizeData,
  type PaginationRootProps as PaginationContract,
} from "@75neo/themes";
import { PaginationVariantsContext } from "./variants";
import { PaginationEllipsis } from "./ellipsis";
import { PaginationFirstTrigger } from "./first-trigger";
import { PaginationItem } from "./item";
import { PaginationLastTrigger } from "./last-trigger";
import { PaginationNextTrigger } from "./next-trigger";
import { PaginationPrevTrigger } from "./prev-trigger";

const paginationRoot = cva("flex items-center", {
  variants: { size: paginationSizeData.root },
  defaultVariants: paginationDefaults,
});

/**
 * Props for the Pagination.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the axis of the same name. The page comes from Ark, because
 * React and Vue spell a controlled page too differently to share one type.
 */
export interface PaginationProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color" | "dir">,
    Pick<React.ComponentProps<typeof Ark.Root>, "page" | "defaultPage" | "onPageChange" | "ids">,
    PaginationContract {
  children?: React.ReactNode;
}

export function Pagination({
  color,
  size,
  count,
  pageSize,
  siblingCount,
  boundaryCount,
  edges,
  href,
  page,
  defaultPage,
  onPageChange,
  ids,
  className,
  children,
  ...rest
}: PaginationProps) {
  const resolved = {
    color: color ?? paginationDefaults.color,
    size: size ?? paginationDefaults.size,
    linked: href != null,
  };

  return (
    <PaginationVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        count={count}
        pageSize={pageSize}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        page={page}
        defaultPage={defaultPage}
        onPageChange={onPageChange}
        /*
         * One prop decides both. Ark needs to know it is rendering anchors and how to
         * address one, and a caller with the addresses has answered both questions.
         */
        type={resolved.linked ? "link" : "button"}
        getPageUrl={href != null ? (details) => href(details.page) : undefined}
        ids={ids}
        data-slot="pagination"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn(paginationRoot(resolved), className)}
      >
        {children ?? (
          <>
            {edges && <PaginationFirstTrigger />}
            <PaginationPrevTrigger />
            {/* Ark works out which pages to show and hands back the row already
                interleaved with its gaps. */}
            <Ark.Context>
              {(api) =>
                api.pages.map((entry, index) =>
                  entry.type === "page" ? (
                    <PaginationItem key={`page-${entry.value}`} value={entry.value} />
                  ) : (
                    <PaginationEllipsis key={`gap-${index}`} index={index} />
                  ),
                )
              }
            </Ark.Context>
            <PaginationNextTrigger />
            {edges && <PaginationLastTrigger />}
          </>
        )}
      </Ark.Root>
    </PaginationVariantsContext.Provider>
  );
}
