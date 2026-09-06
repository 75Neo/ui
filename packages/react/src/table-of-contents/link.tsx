import type React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cva } from "class-variance-authority";
import {
  cn,
  tableOfContentsDefaults,
  tableOfContentsLinkData,
  tableOfContentsSizeData,
} from "@75neo/themes";
import { useTableOfContentsVariants } from "./variants";

const tableOfContentsLink = cva(
  "block truncate rounded-e-sm py-1 ps-3 text-muted outline-primary/25 transition-colors hover:text-highlighted focus-visible:outline-3",
  {
    variants: {
      color: tableOfContentsLinkData,
      size: tableOfContentsSizeData.link,
    },
    defaultVariants: tableOfContentsDefaults,
  },
);

export interface TableOfContentsLinkProps extends React.ComponentProps<typeof Ark.Link> {}

export function TableOfContentsLink({ className, children, ...rest }: TableOfContentsLinkProps) {
  const variants = useTableOfContentsVariants();

  return (
    <Ark.Link
      {...rest}
      data-slot="table-of-contents-link"
      className={cn(tableOfContentsLink(variants), className)}
    >
      {children}
    </Ark.Link>
  );
}
