import type React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cva } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import { cn, paginationDefaults, paginationSizeData } from "@75neo/themes";
import { usePaginationVariants } from "./variants";

const paginationNextTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-highlighted data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: paginationSizeData.trigger },
    defaultVariants: paginationDefaults,
  },
);

export interface PaginationNextTriggerProps extends React.ComponentProps<typeof Ark.NextTrigger> {}

export function PaginationNextTrigger({
  className,
  children,
  ...rest
}: PaginationNextTriggerProps) {
  const variants = usePaginationVariants();
  const inner = <>{children ?? <ChevronRight />}</>;

  /*
   * Ark hands the part the right props for the mode but always renders a button, so
   * the element is chosen here off the root's own `linked` flag.
   */
  return (
    <Ark.NextTrigger {...rest} asChild>
      {variants.linked ? (
        <a
          data-slot="pagination-next-trigger"
          className={cn(paginationNextTrigger(variants), className)}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          data-slot="pagination-next-trigger"
          className={cn(paginationNextTrigger(variants), className)}
        >
          {inner}
        </button>
      )}
    </Ark.NextTrigger>
  );
}
