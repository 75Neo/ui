import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Carousel wraps Ark UI's embla-backed slideshow.
 *
 * `orientation` is styled through `data-orientation` rather than declared as a
 * variant — Ark stamps it on the root and on every part, so `itemGroup` and
 * `control` read it without inflating the variant matrix. The item and
 * indicator slots read the root's orientation through the `carousel` group
 * (`group/carousel`) the same way `accordion` uses `group/accordion`.
 *
 * No variants: layout is driven by Ark's own `slidesPerPage` / `spacing` /
 * `autoplay` props rather than a tailwind-variants matrix, so there is no
 * compound table to keep total.
 */
export const carousel = tv({
  slots: {
    base: "group/carousel flex flex-col gap-4 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-0",
    control:
      "flex items-center gap-3 data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:flex-1 data-[orientation=vertical]:flex-col",
    itemGroup: "min-w-0 flex-1 overflow-hidden scroll-smooth data-[orientation=vertical]:min-h-0",
    item: "min-w-0 shrink-0 basis-full snap-center overflow-hidden rounded-lg bg-muted",
    prevTrigger:
      "inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-default bg-default text-default shadow-xs transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4",
    nextTrigger:
      "inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-default bg-default text-default shadow-xs transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4",
    indicatorGroup: "flex items-center justify-center gap-2 data-[orientation=vertical]:flex-col",
    indicator:
      "size-2 shrink-0 rounded-full bg-muted transition-all duration-200 hover:bg-accented data-current:w-6 data-current:bg-primary [&>svg]:size-full",
  },
  variants: {},
});

export type CarouselVariants = VariantProps<typeof carousel>;
export type CarouselSlots = keyof ReturnType<typeof carousel>;

export type CarouselUI = TVSlot<CarouselSlots>;

export type CarouselTheme = ThemeOverride<CarouselSlots, CarouselVariants>;

/**
 * One slide of the carousel.
 *
 * `content` is a plain string for the common case. Anything richer goes
 * through the adapters' escape hatches — render props in React, scoped slots
 * in Vue — which keeps this type serializable and the two adapters in sync.
 */
export interface CarouselItem {
  id: string;
  content?: string;
}

/**
 * Everything a Carousel accepts that is not framework-specific. `F` is
 * however the framework spells an icon: a `ReactNode` in React, a `Component`
 * in Vue.
 *
 * The value that drives the current page is missing on purpose. It is the one
 * thing the two frameworks genuinely spell differently — `page` /
 * `defaultPage` / `onPageChange` in React against `v-model:page` / `defaultPage`
 * in Vue — so each adapter picks it up from Ark's own root props rather than
 * restating a shared shape neither of them would use as written.
 *
 * The variant props are written out rather than derived from the recipe
 * because `@vue/compiler-sfc` resolves `defineProps` types from source alone:
 * it cannot evaluate the recipe's inferred type, so neither
 * `VariantProps<typeof carousel>` nor a mapped type over `carousel.variants`
 * reaches Vue as finite keys. `CarouselVariantsAreExposed` below closes the gap
 * that leaves.
 */
export interface CarouselProps<F> {
  ui?: CarouselUI;
  items: CarouselItem[];
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  autoplay?: boolean | { delay: number };
  slidesPerPage?: number;
  spacing?: string;
  allowMouseDrag?: boolean;
  prevIcon?: F;
  nextIcon?: F;
}

/**
 * Compile-time guard: adding a variant to the recipe without adding the
 * matching prop above is a type error here rather than a prop that silently
 * does nothing.
 */
export type CarouselVariantsAreExposed = MustBeNever<
  Exclude<keyof CarouselVariants, keyof CarouselProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    carousel: ComponentContract<CarouselSlots, CarouselVariants>;
  }
}
