import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { byColor } from "../colors";

/**
 * Recipe for the TableOfContents: a rail of heading links that follows the reading
 * position.
 *
 * @remarks
 * Depth is not a variant. One list holds headings at several levels, so indentation is
 * styled off the `data-depth` attribute Ark sets per item; a variant resolves once for
 * the whole component and could not tell one row from another. Levels past four share
 * the deepest indent rather than marching off the edge of the rail.
 *
 * The indicator is positioned from the four custom properties Ark measures onto the
 * nav — `--top` and `--height` are the two this recipe spends. They are set on the nav
 * but measured against the list, so the list is the positioned ancestor.
 *
 * The color variant reaches the active link and the indicator, which are the only two
 * things on the rail that are ever not neutral.
 */
export const tableOfContents = tv({
  slots: {
    base: "min-w-0",
    nav: "flex min-w-0 flex-col gap-3",
    title: "font-medium text-dimmed",
    list: "relative flex min-w-0 flex-col border-s border-muted",
    indicator: "absolute inset-s-0 top-(--top) h-(--height) w-px transition-all duration-200",
    item: "min-w-0 data-[depth='3']:ps-3 data-[depth='4']:ps-6 data-[depth='5']:ps-6 data-[depth='6']:ps-6",
    link: "block truncate rounded-e-sm py-1 ps-3 text-muted outline-primary/25 transition-colors hover:text-highlighted focus-visible:outline-3",
  },
  variants: {
    color: {
      ...byColor((color) => ({
        indicator: `bg-${color}`,
        link: `data-active:text-${color}`,
      })),
      neutral: {
        indicator: "bg-inverted",
        link: "data-active:text-highlighted",
      },
    },
    size: {
      sm: { title: "text-[0.6875rem]", link: "text-xs" },
      md: { title: "text-xs", link: "text-sm" },
      lg: { title: "text-sm", link: "text-sm" },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type TableOfContentsVariants = VariantProps<typeof tableOfContents>;
export type TableOfContentsSlots = keyof ReturnType<typeof tableOfContents>;

export type TableOfContentsUI = TVSlot<TableOfContentsSlots>;

export type TableOfContentsTheme = ThemeOverride<TableOfContentsSlots, TableOfContentsVariants>;

/**
 * One heading in the rail.
 *
 * @remarks
 * `value` is the `id` of the heading element on the page, not a slug of the label. Ark
 * resolves it with `getElementById` to know what is on screen, and the link targets it
 * with a hash, so an entry whose id is not on the page renders but never activates.
 */
export interface TableOfContentsItem {
  /** The `id` of the heading element this entry points at. */
  value: string;
  /** Heading level, as a number: 2 for `h2`, 3 for `h3`. */
  depth: number;
  /** Link text. */
  label: string;
}

/**
 * Everything a TableOfContents accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @remarks
 * There is no icon type parameter, because nothing on the rail is an icon.
 *
 * `scrollEl` is missing here on purpose, even though both adapters spell it the same.
 * This package is deliberately DOM-free — it is Tailwind classes and types, and its
 * tests run in node — so a prop returning an `HTMLElement` belongs where the DOM does.
 * Each adapter declares it.
 */
export interface TableOfContentsProps {
  /** Per-slot class overrides. */
  ui?: TableOfContentsUI;
  color?: TableOfContentsVariants["color"];
  size?: TableOfContentsVariants["size"];
  /** The headings to list, in document order. */
  items: TableOfContentsItem[];
  /** Heading above the rail. @defaultValue `"On this page"` */
  title?: string;
  /** Which headings count as active up front, before anything has scrolled. */
  defaultActiveIds?: string[];
  /** The `IntersectionObserver` margin deciding when a heading counts as read. */
  rootMargin?: string;
  /** Scroll the rail itself so the active entry stays visible. @defaultValue `true` */
  autoScroll?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type TableOfContentsVariantsAreExposed = MustBeNever<
  Exclude<keyof TableOfContentsVariants, keyof TableOfContentsProps>
>;

declare global {
  interface Neo75ComponentThemes {
    tableOfContents: ComponentContract<TableOfContentsSlots, TableOfContentsVariants>;
  }
}
