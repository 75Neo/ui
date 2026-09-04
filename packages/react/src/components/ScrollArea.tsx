import type React from "react";
import { ScrollArea as Ark, type ScrollAreaRootProps } from "@ark-ui/react/scroll-area";
import { scrollArea, type ScrollAreaProps as ScrollAreaContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the ScrollArea.
 *
 * @remarks
 * `children` is the scrolling content, wrapped in Ark's viewport and content parts.
 * There is nothing else a caller owns: the scrollbars and the corner are drawn by
 * the component, and which of them appear is the `orientation` prop.
 */
export interface ScrollAreaProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<ScrollAreaRootProps, "ids">,
    ScrollAreaContract {
  /** The scrolling content. */
  children?: React.ReactNode;
}

export function ScrollArea({
  ui,
  size,
  orientation = "vertical",
  children,
  ids,
  className,
  ...rest
}: ScrollAreaProps) {
  const theme = useResolvedTheme(scrollArea, "scrollArea", { ui, size }, className);

  return (
    <Ark.Root {...rest} data-slot="base" className={theme.class.base} ids={ids}>
      <Ark.Viewport data-slot="viewport" className={theme.class.viewport}>
        <Ark.Content data-slot="content" className={theme.class.content}>
          {children}
        </Ark.Content>
      </Ark.Viewport>

      {(orientation === "vertical" || orientation === "both") && (
        <Ark.Scrollbar
          orientation="vertical"
          data-slot="scrollbar"
          className={theme.class.scrollbar}
        >
          <Ark.Thumb data-slot="thumb" className={theme.class.thumb} />
        </Ark.Scrollbar>
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <Ark.Scrollbar
          orientation="horizontal"
          data-slot="scrollbar"
          className={theme.class.scrollbar}
        >
          <Ark.Thumb data-slot="thumb" className={theme.class.thumb} />
        </Ark.Scrollbar>
      )}
      {orientation === "both" && <Ark.Corner data-slot="corner" className={theme.class.corner} />}
    </Ark.Root>
  );
}
