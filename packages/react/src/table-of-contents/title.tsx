import type React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cva } from "class-variance-authority";
import { cn, tableOfContentsDefaults, tableOfContentsSizeData } from "@75neo/themes";
import { useTableOfContentsVariants } from "./variants";

const tableOfContentsTitle = cva("font-medium text-dimmed", {
  variants: { size: tableOfContentsSizeData.title },
  defaultVariants: tableOfContentsDefaults,
});

export interface TableOfContentsTitleProps extends React.ComponentProps<typeof Ark.Title> {}

export function TableOfContentsTitle({ className, children, ...rest }: TableOfContentsTitleProps) {
  const variants = useTableOfContentsVariants();

  return (
    <Ark.Title
      {...rest}
      data-slot="table-of-contents-title"
      className={cn(tableOfContentsTitle(variants), className)}
    >
      {children ?? "On this page"}
    </Ark.Title>
  );
}
