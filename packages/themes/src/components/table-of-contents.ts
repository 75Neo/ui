import { byColor, componentColors, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * TableOfContents styling data: plain class strings both adapters feed into their
 * own `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * Depth is not a variant. One list holds headings at several levels, so indentation
 * is styled off the `data-depth` attribute Ark sets per item. Levels past four share
 * the deepest indent rather than marching off the edge of the rail.
 *
 * The indicator is positioned from custom properties Ark measures onto the nav —
 * `--top` and `--height` — which is why they never appear here as classes.
 */

export type TableOfContentsColor = ComponentColor;
export type TableOfContentsSize = "sm" | "md" | "lg";

export const tableOfContentsDefaults = { color: "primary", size: "md" } as const;

export const tableOfContentsSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const tableOfContentsParts = [
  { export: "TableOfContents", file: "table-of-contents", contract: "TableOfContentsRootProps" },
  { export: "TableOfContentsNav", file: "nav", contract: null },
  { export: "TableOfContentsTitle", file: "title", contract: null },
  { export: "TableOfContentsList", file: "list", contract: null },
  { export: "TableOfContentsIndicator", file: "indicator", contract: null },
  { export: "TableOfContentsItem", file: "item", contract: null },
  { export: "TableOfContentsLink", file: "link", contract: null },
] as const satisfies readonly ComponentPart[];

export const tableOfContentsSizeData = {
  title: {
    sm: "text-[0.6875rem]",
    md: "text-xs",
    lg: "text-sm",
  },
  link: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
} as const satisfies Record<string, Record<TableOfContentsSize, string>>;

export const tableOfContentsIndicatorData = {
  ...byColor((color) => `bg-${color}`),
  neutral: "bg-inverted",
} as const satisfies Record<TableOfContentsColor, string>;

export const tableOfContentsLinkData = {
  ...byColor((color) => `data-active:text-${color}`),
  neutral: "data-active:text-highlighted",
} as const satisfies Record<TableOfContentsColor, string>;

/**
 * One heading in the rail.
 *
 * @remarks
 * Named `Entry` because `TableOfContentsItem` is the part. `value` is the `id` of
 * the heading element on the page, not a slug of the label. Ark resolves it with
 * `getElementById` to know what is on screen, and the link targets it with a hash,
 * so an entry whose id is not on the page renders but never activates.
 */
export interface TableOfContentsEntry {
  /** The `id` of the heading element this entry points at. */
  value: string;
  /** Heading level, as a number: 2 for `h2`, 3 for `h3`. */
  depth: number;
  /** Link text. */
  label: string;
}

/**
 * Everything a TableOfContents accepts in both frameworks. Each adapter adds its
 * own framework props on top.
 *
 * @remarks
 * There is no icon type parameter, because nothing on the rail is an icon.
 * `scrollEl` is missing here on purpose, even though both adapters spell it the
 * same: this package is deliberately DOM-free, so a prop returning an
 * `HTMLElement` belongs where the DOM does. Each adapter declares it.
 */
export interface TableOfContentsRootProps {
  color?: TableOfContentsColor;
  size?: TableOfContentsSize;
  /** The headings to list, in document order. Ark tracks these for activity. */
  items: TableOfContentsEntry[];
  /** Heading above the rail. Omit it with an empty string. @defaultValue `"On this page"` */
  title?: string;
  /** Which headings count as active up front, before anything has scrolled. */
  defaultActiveIds?: string[];
  /** The `IntersectionObserver` margin deciding when a heading counts as read. */
  rootMargin?: string;
  /** Scroll the rail itself so the active entry stays visible. @defaultValue `true` */
  autoScroll?: boolean;
}
