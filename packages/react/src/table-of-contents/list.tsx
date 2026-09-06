import type React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cn } from "@75neo/themes";

export interface TableOfContentsListProps extends React.ComponentProps<typeof Ark.List> {}

export function TableOfContentsList({ className, children, ...rest }: TableOfContentsListProps) {
  return (
    <Ark.List
      {...rest}
      data-slot="table-of-contents-list"
      className={cn("relative flex min-w-0 flex-col border-s border-muted", className)}
    >
      {children}
    </Ark.List>
  );
}
