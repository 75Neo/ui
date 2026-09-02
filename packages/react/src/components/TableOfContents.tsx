import type React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import {
  type TableOfContentsProps as TableOfContentsContract,
  tableOfContents,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the TableOfContents.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name.
 */
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
}

export function TableOfContents({
  ui,
  color,
  size,
  items,
  title = "On this page",
  scrollEl,
  defaultActiveIds,
  rootMargin,
  autoScroll,
  className,
  activeIds,
  onActiveChange,
  ...rest
}: TableOfContentsProps) {
  const theme = useResolvedTheme(
    tableOfContents,
    "tableOfContents",
    { ui, color, size },
    className,
  );

  return (
    <Ark.Root
      data-slot="base"
      className={theme.class.base}
      items={items}
      scrollEl={scrollEl}
      activeIds={activeIds}
      defaultActiveIds={defaultActiveIds}
      rootMargin={rootMargin}
      autoScroll={autoScroll}
      onActiveChange={onActiveChange}
    >
      <Ark.Nav {...rest} data-slot="nav" className={theme.class.nav}>
        {title !== "" && (
          <Ark.Title data-slot="title" className={theme.class.title}>
            {title}
          </Ark.Title>
        )}
        <Ark.List data-slot="list" className={theme.class.list}>
          <Ark.Indicator data-slot="indicator" className={theme.class.indicator} />
          {items.map((item) => (
            <Ark.Item key={item.value} item={item} data-slot="item" className={theme.class.item}>
              <Ark.Link data-slot="link" className={theme.class.link} href={`#${item.value}`}>
                {item.label}
              </Ark.Link>
            </Ark.Item>
          ))}
        </Ark.List>
      </Ark.Nav>
    </Ark.Root>
  );
}
