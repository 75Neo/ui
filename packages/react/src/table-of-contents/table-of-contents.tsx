import type React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import {
  cn,
  tableOfContentsDefaults,
  type TableOfContentsRootProps as TableOfContentsContract,
} from "@75neo/themes";
import { TableOfContentsVariantsContext } from "./variants";
import { TableOfContentsIndicator } from "./indicator";
import { TableOfContentsItem } from "./item";
import { TableOfContentsLink } from "./link";
import { TableOfContentsList } from "./list";
import { TableOfContentsNav } from "./nav";
import { TableOfContentsTitle } from "./title";

export interface TableOfContentsProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color" | "dir" | "title">,
    Pick<React.ComponentProps<typeof Ark.Root>, "activeIds" | "onActiveChange">,
    TableOfContentsContract {
  /**
   * The scrolling element to watch. Defaults to the page itself, which is what a
   * documentation page wants; pass one when the prose scrolls inside a panel.
   */
  scrollEl?: () => HTMLElement | null;
  /** Heading above the rail. Omit it with an empty string. */
  title?: string;
}

export function TableOfContents({
  color,
  size,
  items,
  title = "On this page",
  defaultActiveIds,
  rootMargin,
  autoScroll,
  scrollEl,
  activeIds,
  onActiveChange,
  className,
  ...rest
}: TableOfContentsProps) {
  const resolved = {
    color: color ?? tableOfContentsDefaults.color,
    size: size ?? tableOfContentsDefaults.size,
  };

  return (
    <TableOfContentsVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        items={items}
        scrollEl={scrollEl}
        activeIds={activeIds}
        defaultActiveIds={defaultActiveIds}
        rootMargin={rootMargin}
        autoScroll={autoScroll}
        onActiveChange={onActiveChange}
        data-slot="table-of-contents"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("min-w-0", className)}
      >
        <TableOfContentsNav>
          {title !== "" && <TableOfContentsTitle>{title}</TableOfContentsTitle>}
          <TableOfContentsList>
            <TableOfContentsIndicator />
            {items.map((item) => (
              <TableOfContentsItem key={item.value} item={item}>
                <TableOfContentsLink href={`#${item.value}`}>{item.label}</TableOfContentsLink>
              </TableOfContentsItem>
            ))}
          </TableOfContentsList>
        </TableOfContentsNav>
      </Ark.Root>
    </TableOfContentsVariantsContext.Provider>
  );
}
