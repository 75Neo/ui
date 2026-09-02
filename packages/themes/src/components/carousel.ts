import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Carousel: a paged slideshow with arrows and dots.
 *
 * @remarks
 * There are no variants. Layout comes from the component's own props, and orientation
 * is styled off the `data-orientation` attribute Ark sets rather than declared as a
 * variant.
 *
 * `prev` and `next` deliberately repeat the neutral outline Button's classes rather
 * than composing the Button recipe. A recipe that reached into another one would make
 * either component's `ui` prop able to reshape the other, and the cascade has no way to
 * express that.
 */
export const carousel = tv({
  slots: {
    base: "group/carousel flex flex-col gap-4 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-0",
    controls:
      "flex items-center gap-3 data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:flex-1 data-[orientation=vertical]:flex-col",
    viewport: "min-w-0 flex-1 overflow-hidden scroll-smooth data-[orientation=vertical]:min-h-0",
    item: "min-w-0 shrink-0 basis-full snap-center overflow-hidden rounded-lg bg-muted",
    prev: "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-default text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75 [&>svg]:size-4",
    next: "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-default text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75 [&>svg]:size-4",
    dots: "flex items-center justify-center gap-2 data-[orientation=vertical]:flex-col",
    dot: "size-2 shrink-0 cursor-pointer rounded-full bg-accented outline-primary/25 transition-all duration-200 hover:bg-inverted/40 focus-visible:outline-3 data-current:w-6 data-current:bg-primary [&>svg]:size-full",
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
 * @remarks
 * The text is a plain string, which keeps a slide serializable. For richer markup use
 * the adapter's escape hatch: render props in React, scoped slots in Vue.
 */
export interface CarouselItem {
  /** Identifies the slide. */
  id: string;
  /** Slide text. */
  content?: string;
}

/**
 * Everything a Carousel accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The current page is not here: React spells it `page` and `onPageChange`, Vue spells
 * it `v-model:page`, so each adapter takes it from Ark's root instead.
 */
export interface CarouselProps<F> {
  /** Per-slot class overrides. */
  ui?: CarouselUI;
  /** The slides to render, in order. */
  items: CarouselItem[];
  /** @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /** Wrap around instead of stopping at the last slide. */
  loop?: boolean;
  /** Advance on a timer. Pass a delay in milliseconds to set the pace. */
  autoplay?: boolean | { delay: number };
  /** Slides visible per page. */
  slidesPerPage?: number;
  /** Gap between slides, as a CSS length. */
  spacing?: string;
  /** Let the pointer drag the track. */
  allowMouseDrag?: boolean;
  prevIcon?: F;
  nextIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type CarouselVariantsAreExposed = MustBeNever<
  Exclude<keyof CarouselVariants, keyof CarouselProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    carousel: ComponentContract<CarouselSlots, CarouselVariants>;
  }
}
