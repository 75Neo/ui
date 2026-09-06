import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * ScrollArea styling data: plain class strings both adapters feed into their own
 * `cva` calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * The viewport hides its native scrollbar and the styled one takes its place. That
 * scrollbar shows only while the pointer is over the region, while it has focus
 * within, or while it scrolls, which is what keeps a quiet page quiet until the
 * reader reaches for it.
 *
 * Orientation is not an axis. Ark writes `data-orientation` on the scrollbar, the
 * thumb and the corner, so one class string covers every direction.
 *
 * There is no `color`. A scrollbar carries no meaning; it carries the thumb.
 */

export type ScrollAreaSize = "sm" | "md" | "lg";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface ScrollAreaVariants {
  size: ScrollAreaSize;
}

export const scrollAreaDefaults = { size: "md" } as const;

export const scrollAreaSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const scrollAreaParts = [
  { export: "ScrollArea", file: "scroll-area", contract: "ScrollAreaRootProps" },
  { export: "ScrollAreaViewport", file: "viewport", contract: null },
  { export: "ScrollAreaContent", file: "content", contract: null },
  { export: "ScrollAreaScrollbar", file: "scrollbar", contract: "ScrollAreaScrollbarProps" },
  { export: "ScrollAreaThumb", file: "thumb", contract: null },
  { export: "ScrollAreaCorner", file: "corner", contract: null },
] as const satisfies readonly ComponentPart[];

export const scrollAreaSizeData = {
  scrollbar: {
    sm: "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
    md: "data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
    lg: "data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5",
  },
  corner: {
    sm: "size-1.5",
    md: "size-2",
    lg: "size-2.5",
  },
} as const satisfies Record<string, Record<ScrollAreaSize, string>>;

/** Everything a ScrollArea scrollbar accepts in both frameworks. */
export interface ScrollAreaScrollbarProps {
  /** Which way it runs. @defaultValue `"vertical"` */
  orientation?: "vertical" | "horizontal";
}

/**
 * Everything the ScrollArea root accepts in both frameworks.
 *
 * @remarks
 * The region's content is whatever the framework calls children, because a scroll
 * area usually holds markup rather than a sentence.
 */
export interface ScrollAreaRootProps {
  size?: ScrollAreaSize;
  /** Which scrollbars are drawn. @defaultValue `"vertical"` */
  orientation?: "vertical" | "horizontal" | "both";
}
