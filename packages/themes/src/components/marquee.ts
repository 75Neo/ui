import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Marquee styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * The scroll is the component, not decoration on top of one, so it is the one place
 * in the library that ships continuous motion. `motion-reduce:` turns it off, and a
 * `data-paused` selector on the root stills the content wherever it sits.
 *
 * The timing is split between Ark and these classes on purpose. Ark writes the
 * duration, the delay and the loop count as custom properties on the root from its
 * own measurements, and the classes only name the keyframe. So `side` picks one of
 * two keyframes and nothing else, and a new side costs one line.
 */

export type MarqueeSide = "start" | "end" | "top" | "bottom";
export type MarqueeSize = "sm" | "md" | "lg";
export type MarqueeSpeed = "slow" | "normal" | "fast";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface MarqueeVariants {
  side: MarqueeSide;
  size: MarqueeSize;
  speed: MarqueeSpeed;
}

export const marqueeDefaults = { side: "start", size: "md", speed: "normal" } as const;

export const marqueeSchema = {
  side: { values: ["start", "end", "top", "bottom"], defaultValue: "start" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
  speed: { values: ["slow", "normal", "fast"], defaultValue: "normal" },
} as const satisfies ComponentSchema;

export const marqueeParts = [
  { export: "Marquee", file: "marquee", contract: "MarqueeRootProps" },
  { export: "MarqueeViewport", file: "viewport", contract: null },
  { export: "MarqueeContent", file: "content", contract: null },
  { export: "MarqueeItem", file: "item", contract: null },
  { export: "MarqueeEdge", file: "edge", contract: "MarqueeEdgeProps" },
] as const satisfies readonly ComponentPart[];

export const marqueeSideData = {
  content: {
    start: "[animation-name:marquee-x]",
    end: "[animation-name:marquee-x]",
    top: "[animation-name:marquee-y]",
    bottom: "[animation-name:marquee-y]",
  },
} as const satisfies Record<string, Record<MarqueeSide, string>>;

export const marqueeSizeData = {
  item: {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  },
} as const satisfies Record<string, Record<MarqueeSize, string>>;

export const marqueeSpeedData = {
  content: {
    slow: "[animation-duration:60s]",
    normal: "[animation-duration:40s]",
    fast: "[animation-duration:20s]",
  },
} as const satisfies Record<string, Record<MarqueeSpeed, string>>;

/** One item of the marquee. */
export interface MarqueeItemData {
  /** Identifies the item. */
  id: string;
  /** Item text. Anything richer goes in as the item's own children. */
  content?: string;
}

/** Everything a Marquee fade accepts in both frameworks. */
export interface MarqueeEdgeProps {
  /** Which end of the scrolling area it covers. */
  side: MarqueeSide;
}

/**
 * Everything the Marquee root accepts in both frameworks.
 *
 * @remarks
 * The pause state is not here: React spells it `paused` with `onPauseChange`, Vue
 * spells it `v-model:paused`, so each adapter takes it from Ark's root instead.
 *
 * `side` is both an axis and Ark's own prop, so one word drives the scroll direction
 * and the keyframe together. `speed` is ours alone: Ark's numeric speed would fight
 * it over the same duration, so the three named paces are the whole control.
 */
export interface MarqueeRootProps {
  side?: MarqueeSide;
  size?: MarqueeSize;
  speed?: MarqueeSpeed;
  /** The items to scroll, in order. */
  items?: MarqueeItemData[];
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
