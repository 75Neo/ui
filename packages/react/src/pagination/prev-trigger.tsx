import type React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cva } from "class-variance-authority";
import { ChevronLeft } from "lucide-react";
import { cn, paginationDefaults, paginationSizeData } from "@75neo/themes";
import { usePaginationVariants } from "./variants";

const paginationPrevTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-highlighted data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: paginationSizeData.trigger },
    defaultVariants: paginationDefaults,
  },
);

export interface PaginationPrevTriggerProps extends React.ComponentProps<typeof Ark.PrevTrigger> {}

export function PaginationPrevTrigger({
  className,
  children,
  ...rest
}: PaginationPrevTriggerProps) {
  const variants = usePaginationVariants();
  const inner = <>{children ?? <ChevronLeft />}</>;

  /*
   * Ark hands the part the right props for the mode but always renders a button, so
   * the element is chosen here off the root's own `linked` flag.
   */
  return (
    <Ark.PrevTrigger {...rest} asChild>
      {variants.linked ? (
        <a
          data-slot="pagination-prev-trigger"
          className={cn(paginationPrevTrigger(variants), className)}
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          data-slot="pagination-prev-trigger"
          className={cn(paginationPrevTrigger(variants), className)}
        >
          {inner}
        </button>
      )}
    </Ark.PrevTrigger>
  );
}
