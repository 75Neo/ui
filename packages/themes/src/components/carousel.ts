import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Carousel styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * Orientation is not an axis. Every part styles itself off the `data-orientation`
 * attribute Ark sets, so one class string covers both directions.
 *
 * The arrows repeat the neutral outline button's classes rather than composing the
 * Button, because reaching into another component's classes would let either reshape
 * the other. There is no `color`: a slideshow carries no meaning, what is in it does.
 */

export type CarouselSize = "sm" | "md" | "lg";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface CarouselVariants {
  size: CarouselSize;
}

export const carouselDefaults = { size: "md" } as const;

export const carouselSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const carouselParts = [
  { export: "Carousel", file: "carousel", contract: "CarouselRootProps" },
  { export: "CarouselControl", file: "control", contract: null },
  { export: "CarouselPrevTrigger", file: "prev-trigger", contract: null },
  { export: "CarouselNextTrigger", file: "next-trigger", contract: null },
  { export: "CarouselItemGroup", file: "item-group", contract: null },
  { export: "CarouselItem", file: "item", contract: "CarouselItemProps" },
  { export: "CarouselIndicatorGroup", file: "indicator-group", contract: null },
  { export: "CarouselIndicator", file: "indicator", contract: "CarouselIndicatorProps" },
] as const satisfies readonly ComponentPart[];

export const carouselSizeData = {
  trigger: {
    sm: "size-7 [&>svg]:size-3.5",
    md: "size-8 [&>svg]:size-4",
    lg: "size-10 [&>svg]:size-5",
  },
  indicator: {
    sm: "size-1.5 data-current:w-4",
    md: "size-2 data-current:w-6",
    lg: "size-2.5 data-current:w-8",
  },
} as const satisfies Record<string, Record<CarouselSize, string>>;

/** One slide of the carousel. */
export interface CarouselItemData {
  /** Identifies the slide. */
  id: string;
  /** Slide text. Anything richer goes in as the slide's own children. */
  content?: string;
}

/** Everything a Carousel slide accepts in both frameworks. */
export interface CarouselItemProps {
  /** Which slide this is, counting from zero. */
  index: number;
}

/** Everything a Carousel dot accepts in both frameworks. */
export interface CarouselIndicatorProps {
  /** Which slide it jumps to, counting from zero. */
  index: number;
}

/**
 * Everything the Carousel root accepts in both frameworks.
 *
 * @remarks
 * The current page is not here: React spells it `page` with `onPageChange`, Vue
 * spells it `v-model:page`, so each adapter takes it from Ark's root instead.
 */
export interface CarouselRootProps {
  size?: CarouselSize;
  /** The slides to render, in order. */
  items?: CarouselItemData[];
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
}
