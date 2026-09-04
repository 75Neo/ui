import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Marquee: a row of items scrolling in a seamless loop.
 *
 * @remarks
 * The motion is split between Ark and the recipe on purpose. Ark writes the timing —
 * `--marquee-duration`, `--marquee-delay`, `--marquee-loop-count` — as custom properties
 * on the root from its own measurements, and the recipe only names the keyframe. The
 * `side` variant therefore picks `marquee-x` or `marquee-y` and nothing else, and a new
 * side costs one line rather than a new animation.
 *
 * The loop needs no `prefers-reduced-motion` query in the recipe: `motion-reduce:` turns
 * the animation off, and pausing is a `data-paused` selector on the root that stills the
 * content wherever it sits, which is what Ark's own CSS does.
 *
 * `side` is both a variant and Ark's own prop, so one word drives the scroll direction
 * and the keyframe together. `speed` is variant-only: Ark's numeric speed would fight it
 * over the same duration, so the three named paces are the whole control.
 */
export const marquee = tv({
  slots: {
    base: "relative w-full overflow-hidden data-paused:**:[animation-play-state:paused] data-[orientation=vertical]:h-60",
    viewport: "size-full",
    content:
      "items-center [animation-delay:var(--marquee-delay)] [animation-duration:var(--marquee-duration)] [animation-iteration-count:var(--marquee-loop-count)] [animation-timing-function:linear] data-reverse:[animation-direction:reverse] motion-reduce:animate-none",
    item: "flex shrink-0 items-center gap-2 rounded-md bg-muted text-toned ring ring-accented select-none ring-inset",
    edge: "pointer-events-none z-10 data-[side=bottom]:h-[15%] data-[side=bottom]:[background:linear-gradient(to_top,var(--ui-bg),transparent)] data-[side=end]:w-[15%] data-[side=end]:[background:linear-gradient(to_left,var(--ui-bg),transparent)] data-[side=start]:w-[15%] data-[side=start]:[background:linear-gradient(to_right,var(--ui-bg),transparent)] data-[side=top]:h-[15%] data-[side=top]:[background:linear-gradient(to_bottom,var(--ui-bg),transparent)] rtl:data-[side=end]:[background:linear-gradient(to_right,var(--ui-bg),transparent)] rtl:data-[side=start]:[background:linear-gradient(to_left,var(--ui-bg),transparent)]",
  },
  variants: {
    side: {
      start: { content: "[animation-name:marquee-x]" },
      end: { content: "[animation-name:marquee-x]" },
      top: { content: "[animation-name:marquee-y]" },
      bottom: { content: "[animation-name:marquee-y]" },
    },
    size: {
      sm: { item: "px-2.5 py-1 text-xs" },
      md: { item: "px-3 py-1.5 text-sm" },
      lg: { item: "px-4 py-2 text-base" },
    },
    speed: {
      slow: { content: "[animation-duration:60s]" },
      normal: { content: "[animation-duration:40s]" },
      fast: { content: "[animation-duration:20s]" },
    },
  },
  defaultVariants: {
    side: "start",
    size: "md",
    speed: "normal",
  },
});

export type MarqueeVariants = VariantProps<typeof marquee>;
export type MarqueeSlots = keyof ReturnType<typeof marquee>;

export type MarqueeUI = TVSlot<MarqueeSlots>;

export type MarqueeTheme = ThemeOverride<MarqueeSlots, MarqueeVariants>;

/**
 * One item of the marquee.
 *
 * @remarks
 * The text is a plain string, which keeps an item serializable. For richer markup use
 * the adapter's escape hatch: render props in React, scoped slots in Vue.
 */
export interface MarqueeItem {
  /** Identifies the item. */
  id: string;
  /** Item text. */
  content?: string;
}

/**
 * Everything a Marquee accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * There is no icon type parameter, because items carry their own markup through the
 * escape hatch rather than through icon props.
 *
 * The pause state is not here: React spells it `paused` with `onPauseChange`, Vue
 * spells it `v-model:paused`, so each adapter takes it from Ark's root instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface MarqueeProps {
  /** Per-slot class overrides. */
  ui?: MarqueeUI;
  side?: MarqueeVariants["side"];
  size?: MarqueeVariants["size"];
  speed?: MarqueeVariants["speed"];
  /** The items to scroll, in order. */
  items: MarqueeItem[];
  /** Draw the fade at both ends of the scrolling area. */
  edge?: boolean;
  /** Duplicate the content until it fills the viewport. */
  autoFill?: boolean;
  /** Gap between items, as a CSS length. @defaultValue `"1rem"` */
  spacing?: string;
  /** Delay before the animation starts, in seconds. @defaultValue `0` */
  delay?: number;
  /** How many loops to run. `0` loops forever. @defaultValue `0` */
  loopCount?: number;
  /** Scroll towards the other end. */
  reverse?: boolean;
  /** Still the loop while the pointer hovers or focus lands inside. */
  pauseOnInteraction?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type MarqueeVariantsAreExposed = MustBeNever<
  Exclude<keyof MarqueeVariants, keyof MarqueeProps>
>;

declare global {
  interface Neo75ComponentThemes {
    marquee: ComponentContract<MarqueeSlots, MarqueeVariants>;
  }
}
