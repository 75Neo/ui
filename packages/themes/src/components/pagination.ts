import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Pagination: the row of page numbers and the arrows either side.
 *
 * @remarks
 * `base` is Ark's own `nav`, which is one of the few roots in the library that is a
 * real element rather than a context provider. Everything sits directly in it, so there
 * is no list slot between the nav and the buttons: a row of buttons in a labelled `nav`
 * is already the markup a screen reader wants.
 *
 * The four arrows and the page numbers are separate slots even though they look alike,
 * because they do not stay alike. A caller who hides the numbers on a phone, or makes
 * the arrows wider than the numbers, is doing something ordinary, and one shared slot
 * would make either of those reach for a child selector.
 *
 * The current page is `data-selected` and is filled in the accent. Every other button
 * is a ghost, so the row reads as one thing with a position marked in it rather than as
 * nine buttons of equal weight. The hover shade is written `not-data-selected:hover:`
 * rather than plain `hover:`, so that passing over the page you are already on does not
 * lift the accent off it — and so that the accent needs only the one safelisted class
 * rather than a hovered variant of every colour.
 *
 * The arrows are styled with `data-disabled:` rather than `disabled:`, which is the one
 * place this recipe departs from the rule that a real button takes the attribute. Ark
 * sets the attribute only while the row is buttons; once `href` turns the row into
 * anchors it sets the data attribute alone, and an arrow that looked enabled at the end
 * of the range in one mode and not the other would be a bug nobody would think to look
 * for.
 */
export const pagination = tv({
  slots: {
    base: "flex items-center",
    item: "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium text-toned tabular-nums transition-colors outline-none select-none hover:not-data-selected:bg-elevated hover:not-data-selected:text-highlighted data-selected:text-inverted",
    ellipsis: "inline-flex shrink-0 items-center justify-center text-dimmed select-none",
    firstTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-highlighted data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&>svg]:size-full",
    prevTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-highlighted data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&>svg]:size-full",
    nextTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-highlighted data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&>svg]:size-full",
    lastTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-highlighted data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&>svg]:size-full",
  },
  variants: {
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: "",
    },
    size: {
      sm: {
        base: "gap-0.5",
        item: "size-7 text-xs",
        ellipsis: "size-7 text-xs",
        firstTrigger: "size-7 p-1.5",
        prevTrigger: "size-7 p-1.5",
        nextTrigger: "size-7 p-1.5",
        lastTrigger: "size-7 p-1.5",
      },
      md: {
        base: "gap-1",
        item: "size-9 text-sm",
        ellipsis: "size-9 text-sm",
        firstTrigger: "size-9 p-2",
        prevTrigger: "size-9 p-2",
        nextTrigger: "size-9 p-2",
        lastTrigger: "size-9 p-2",
      },
      lg: {
        base: "gap-1.5",
        item: "size-10 text-sm",
        ellipsis: "size-10 text-sm",
        firstTrigger: "size-10 p-2.5",
        prevTrigger: "size-10 p-2.5",
        nextTrigger: "size-10 p-2.5",
        lastTrigger: "size-10 p-2.5",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { item: `data-selected:bg-${color}` },
    })),
    {
      color: "neutral",
      class: { item: "data-selected:bg-inverted" },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type PaginationVariants = VariantProps<typeof pagination>;
export type PaginationSlots = keyof ReturnType<typeof pagination>;

export type PaginationUI = TVSlot<PaginationSlots>;

export type PaginationTheme = ThemeOverride<PaginationSlots, PaginationVariants>;

/**
 * Everything a Pagination accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The page is not here: React spells it `page` with `onPageChange`, Vue spells it
 * `v-model:page`, so each adapter takes it from Ark's root instead.
 *
 * `count` is how many things there are, not how many pages. The pages follow from it
 * and `pageSize`, which is the only pair a caller reliably knows: a list that grew by
 * one changes its page count without anyone deciding to.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface PaginationProps<F> {
  /** Per-slot class overrides. */
  ui?: PaginationUI;
  color?: PaginationVariants["color"];
  size?: PaginationVariants["size"];
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
   * With it, Ark renders anchors rather than buttons, so a crawler can follow the pages
   * and a reader can open one in a tab. Without it the pages are buttons and the page
   * changes in place.
   */
  href?: (page: number) => string;
  /** Replaces the arrow that goes back a page. */
  prevIcon?: F;
  /** Replaces the arrow that goes on a page. */
  nextIcon?: F;
  /** Replaces the arrow that jumps to the first page. */
  firstIcon?: F;
  /** Replaces the arrow that jumps to the last page. */
  lastIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type PaginationVariantsAreExposed = MustBeNever<
  Exclude<keyof PaginationVariants, keyof PaginationProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    pagination: ComponentContract<PaginationSlots, PaginationVariants>;
  }
}
