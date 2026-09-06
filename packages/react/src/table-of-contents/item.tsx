import type React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cn, type TableOfContentsEntry } from "@75neo/themes";

export interface TableOfContentsItemProps extends Omit<
  React.ComponentProps<typeof Ark.Item>,
  "item"
> {
  item: TableOfContentsEntry;
}

export function TableOfContentsItem({
  item,
  className,
  children,
  ...rest
}: TableOfContentsItemProps) {
  return (
    <Ark.Item
      {...rest}
      item={item}
      data-slot="table-of-contents-item"
      className={cn(
        "min-w-0 data-[depth='3']:ps-3 data-[depth='4']:ps-6 data-[depth='5']:ps-6 data-[depth='6']:ps-6",
        className,
      )}
    >
      {children}
    </Ark.Item>
  );
}
