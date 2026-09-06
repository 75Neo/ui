import type React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cva } from "class-variance-authority";
import { cn, tableOfContentsDefaults, tableOfContentsIndicatorData } from "@75neo/themes";
import { useTableOfContentsVariants } from "./variants";

const tableOfContentsIndicator = cva(
  "absolute inset-s-0 top-(--top) h-(--height) w-px transition-all duration-200",
  {
    variants: { color: tableOfContentsIndicatorData },
    defaultVariants: tableOfContentsDefaults,
  },
);

export interface TableOfContentsIndicatorProps extends React.ComponentProps<typeof Ark.Indicator> {}

export function TableOfContentsIndicator({ className, ...rest }: TableOfContentsIndicatorProps) {
  const variants = useTableOfContentsVariants();

  return (
    <Ark.Indicator
      {...rest}
      data-slot="table-of-contents-indicator"
      className={cn(tableOfContentsIndicator(variants), className)}
    />
  );
}
