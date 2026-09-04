import type React from "react";
import { Pagination as Ark, type PaginationRootProps } from "@ark-ui/react/pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { pagination, type PaginationProps as PaginationContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Pagination.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name.
 *
 * The page props come from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface PaginationProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color" | "dir">,
    Pick<PaginationRootProps, "page" | "defaultPage" | "onPageChange" | "ids">,
    PaginationContract<React.ReactNode> {}

export function Pagination({
  ui,
  color,
  size,
  count,
  pageSize,
  siblingCount,
  boundaryCount,
  edges = false,
  href,
  prevIcon,
  nextIcon,
  firstIcon,
  lastIcon,
  page,
  defaultPage,
  onPageChange,
  ids,
  className,
  ...rest
}: PaginationProps) {
  const theme = useResolvedTheme(pagination, "pagination", { ui, color, size }, className);

  /*
   * Ark hands every part the right props for the mode — a `type` and a `disabled` for a
   * button, an `href` for an anchor — but it always renders a `button`. So the element
   * is chosen once here and every part is written through `asChild`, which keeps the
   * markup one shape rather than branching six times.
   */
  const Cell = href != null ? "a" : "button";

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      count={count}
      pageSize={pageSize}
      siblingCount={siblingCount}
      boundaryCount={boundaryCount}
      page={page}
      defaultPage={defaultPage}
      onPageChange={onPageChange}
      /*
       * One prop decides both. Ark needs to know it is rendering anchors and how to
       * address one, and a caller who has the addresses has already answered both
       * questions — asking for a `type` beside them would be asking twice.
       */
      type={href != null ? "link" : "button"}
      getPageUrl={href != null ? (details) => href(details.page) : undefined}
      ids={ids}
    >
      {edges && (
        <Ark.FirstTrigger asChild>
          <Cell data-slot="firstTrigger" className={theme.class.firstTrigger}>
            {firstIcon ?? <ChevronsLeft />}
          </Cell>
        </Ark.FirstTrigger>
      )}
      <Ark.PrevTrigger asChild>
        <Cell data-slot="prevTrigger" className={theme.class.prevTrigger}>
          {prevIcon ?? <ChevronLeft />}
        </Cell>
      </Ark.PrevTrigger>

      {/* Ark works out which pages to show from the count, the page size and the two
          window props, and hands back the row already interleaved with its gaps. */}
      <Ark.Context>
        {(api) =>
          api.pages.map((entry, index) =>
            entry.type === "page" ? (
              <Ark.Item key={`page-${entry.value}`} type="page" value={entry.value} asChild>
                <Cell data-slot="item" className={theme.class.item}>
                  {entry.value}
                </Cell>
              </Ark.Item>
            ) : (
              <Ark.Ellipsis
                key={`gap-${index}`}
                index={index}
                data-slot="ellipsis"
                className={theme.class.ellipsis}
              >
                &hellip;
              </Ark.Ellipsis>
            ),
          )
        }
      </Ark.Context>

      <Ark.NextTrigger asChild>
        <Cell data-slot="nextTrigger" className={theme.class.nextTrigger}>
          {nextIcon ?? <ChevronRight />}
        </Cell>
      </Ark.NextTrigger>
      {edges && (
        <Ark.LastTrigger asChild>
          <Cell data-slot="lastTrigger" className={theme.class.lastTrigger}>
            {lastIcon ?? <ChevronsRight />}
          </Cell>
        </Ark.LastTrigger>
      )}
    </Ark.Root>
  );
}
