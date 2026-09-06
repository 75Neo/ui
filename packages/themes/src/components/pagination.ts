import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Pagination styling data: plain class strings both adapters feed into their own
 * `cva` calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * The root is Ark's own `nav`, one of the few roots in the library that is a real
 * element. Everything sits directly in it: a row of buttons in a labelled `nav` is
 * already the markup a screen reader wants, so there is no list part between them.
 *
 * The current page is `data-selected` and is filled in the accent; every other button
 * is a ghost, so the row reads as one thing with a position marked in it. The hover
 * shade is `not-data-selected:hover:` rather than plain `hover:`, so passing over the
 * page you are already on does not lift the accent off it.
 *
 * The arrows are styled with `data-disabled:` rather than `disabled:`. Ark sets the
 * real attribute only while the row is buttons; once a link address turns the row into
 * anchors it sets the data attribute alone.
 */

export type PaginationSize = "sm" | "md" | "lg";
export type PaginationColor = ComponentColor;

/** What the root publishes and every part reads. Lives in each adapter. */
export interface PaginationVariants {
  color: PaginationColor;
  size: PaginationSize;
  /** Whether the row renders anchors rather than buttons. */
  linked: boolean;
}

export const paginationDefaults = { color: "primary", size: "md" } as const;

export const paginationSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const paginationParts = [
  { export: "Pagination", file: "pagination", contract: "PaginationRootProps" },
  { export: "PaginationFirstTrigger", file: "first-trigger", contract: null },
  { export: "PaginationPrevTrigger", file: "prev-trigger", contract: null },
  { export: "PaginationItem", file: "item", contract: "PaginationItemProps" },
  { export: "PaginationEllipsis", file: "ellipsis", contract: "PaginationEllipsisProps" },
  { export: "PaginationNextTrigger", file: "next-trigger", contract: null },
  { export: "PaginationLastTrigger", file: "last-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const paginationSizeData = {
  root: {
    sm: "gap-0.5",
    md: "gap-1",
    lg: "gap-1.5",
  },
  item: {
    sm: "size-7 text-xs",
    md: "size-9 text-sm",
    lg: "size-10 text-sm",
  },
  ellipsis: {
    sm: "size-7 text-xs",
    md: "size-9 text-sm",
    lg: "size-10 text-sm",
  },
  trigger: {
    sm: "size-7 p-1.5",
    md: "size-9 p-2",
    lg: "size-10 p-2.5",
  },
} as const satisfies Record<string, Record<PaginationSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface PaginationItemCompound {
  color?: PaginationColor;
  class: string;
}

export const paginationItemCompoundData: PaginationItemCompound[] = [
  ...eachColor((color) => ({ color, class: `data-selected:bg-${color}` })),
  { color: "neutral", class: "data-selected:bg-inverted" },
];

/** Everything a Pagination page button accepts in both frameworks. */
export interface PaginationItemProps {
  /** Which page it goes to, counting from one. */
  value: number;
}

/** Everything a Pagination gap accepts in both frameworks. */
export interface PaginationEllipsisProps {
  /** Which gap this is, counting from zero. */
  index: number;
}

/**
 * Everything the Pagination root accepts in both frameworks.
 *
 * @remarks
 * The page is not here: React spells it `page` with `onPageChange`, Vue spells it
 * `v-model:page`, so each adapter takes it from Ark's root instead.
 *
 * `count` is how many things there are, not how many pages. The pages follow from it
 * and `pageSize`, which is the only pair a caller reliably knows: a list that grew by
 * one changes its page count without anyone deciding to.
 */
export interface PaginationRootProps {
  color?: PaginationColor;
  size?: PaginationSize;
  /** How many things there are in total, across every page. */
  count: number;
  /** How many of them fit on one page. @defaultValue `10` */
  pageSize?: number;
  /** How many pages to show either side of the current one. @defaultValue `1` */
  siblingCount?: number;
  /** How many pages to show at each end of the row. @defaultValue `1` */
  boundaryCount?: number;
  /** Show the buttons that jump to the first and last page. @defaultValue `false` */
  edges?: boolean;
  /**
   * Turn every page into a link to this address.
   *
   * @remarks
   * With it, Ark renders anchors rather than buttons, so a crawler can follow the
   * pages and a reader can open one in a tab. Without it the pages are buttons and
   * the page changes in place.
   */
  href?: (page: number) => string;
}
