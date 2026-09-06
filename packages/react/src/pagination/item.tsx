import type React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cva } from "class-variance-authority";
import {
  cn,
  paginationDefaults,
  paginationItemCompoundData,
  paginationSizeData,
  type PaginationItemProps as PaginationItemContract,
} from "@75neo/themes";
import { usePaginationVariants } from "./variants";

const paginationItem = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium text-toned tabular-nums transition-colors outline-none select-none hover:not-data-selected:bg-elevated hover:not-data-selected:text-highlighted data-selected:text-inverted",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: paginationSizeData.item,
    },
    compoundVariants: paginationItemCompoundData,
    defaultVariants: paginationDefaults,
  },
);

export interface PaginationItemProps
  extends Omit<React.ComponentProps<typeof Ark.Item>, "type" | "value">, PaginationItemContract {}

export function PaginationItem({ value, className, children, ...rest }: PaginationItemProps) {
  const variants = usePaginationVariants();
  const itemClass = cn(paginationItem(variants), className);

  // Ark hands the part the right props for the mode but always renders a button.
  return (
    <Ark.Item {...rest} type="page" value={value} asChild>
      {variants.linked ? (
        <a data-slot="pagination-item" className={itemClass}>
          {children ?? value}
        </a>
      ) : (
        <button type="button" data-slot="pagination-item" className={itemClass}>
          {children ?? value}
        </button>
      )}
    </Ark.Item>
  );
}
