import type React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cn } from "@75neo/themes";

export interface TableOfContentsNavProps extends React.ComponentProps<typeof Ark.Nav> {}

export function TableOfContentsNav({ className, children, ...rest }: TableOfContentsNavProps) {
  return (
    <Ark.Nav
      {...rest}
      data-slot="table-of-contents-nav"
      className={cn("flex min-w-0 flex-col gap-3", className)}
    >
      {children}
    </Ark.Nav>
  );
}
