import type React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cva } from "class-variance-authority";
import {
  cn,
  paginationDefaults,
  paginationSizeData,
  type PaginationEllipsisProps as PaginationEllipsisContract,
} from "@75neo/themes";
import { usePaginationVariants } from "./variants";

const paginationEllipsis = cva(
  "inline-flex shrink-0 items-center justify-center text-dimmed select-none",
  {
    variants: { size: paginationSizeData.ellipsis },
    defaultVariants: paginationDefaults,
  },
);

export interface PaginationEllipsisProps
  extends Omit<React.ComponentProps<typeof Ark.Ellipsis>, "index">, PaginationEllipsisContract {}

export function PaginationEllipsis({
  index,
  className,
  children,
  ...rest
}: PaginationEllipsisProps) {
  const variants = usePaginationVariants();

  return (
    <Ark.Ellipsis
      {...rest}
      index={index}
      data-slot="pagination-ellipsis"
      className={cn(paginationEllipsis(variants), className)}
    >
      {children ?? "…"}
    </Ark.Ellipsis>
  );
}
