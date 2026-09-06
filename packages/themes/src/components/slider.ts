import { byColor, componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Slider styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * Orientation is not an axis. Ark writes `data-orientation` on every part and each
 * one styles itself off it, which keeps the matrix at thirty five rather than seventy.
 *
 * The thumb and the markers are sized here and positioned by Ark, which writes
 * `position`, an offset along the axis and a `translate` that centres them on it, all
 * inline. So nothing here may offset or translate either: a Tailwind translate sets a
 * different property than Ark's inline one and the two would compose into a double
 * shift rather than replacing one another.
 *
 * A range with two thumbs is the same parts: Ark renders one thumb per value and the
 * range between the outermost two, so nothing about the styling counts them.
 */

export type SliderSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SliderColor = ComponentColor;

/** What the root publishes and every part reads. Lives in each adapter. */
export interface SliderVariants {
  color: SliderColor;
  size: SliderSize;
}

export const sliderDefaults = { color: "primary", size: "md" } as const;

export const sliderSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const sliderParts = [
  { export: "Slider", file: "slider", contract: "SliderRootProps" },
  { export: "SliderLabel", file: "label", contract: null },
  { export: "SliderValueText", file: "value-text", contract: null },
  { export: "SliderControl", file: "control", contract: null },
  { export: "SliderTrack", file: "track", contract: null },
  { export: "SliderRange", file: "range", contract: null },
  { export: "SliderThumb", file: "thumb", contract: "SliderThumbProps" },
  { export: "SliderMarkerGroup", file: "marker-group", contract: null },
  { export: "SliderMarker", file: "marker", contract: "SliderMarkerProps" },
] as const satisfies readonly ComponentPart[];

export const sliderSizeData = {
  control: {
    xs: "group-data-[orientation=horizontal]/slider:h-3 group-data-[orientation=vertical]/slider:w-3",
    sm: "group-data-[orientation=horizontal]/slider:h-4 group-data-[orientation=vertical]/slider:w-4",
    md: "group-data-[orientation=horizontal]/slider:h-5 group-data-[orientation=vertical]/slider:w-5",
    lg: "group-data-[orientation=horizontal]/slider:h-6 group-data-[orientation=vertical]/slider:w-6",
    xl: "group-data-[orientation=horizontal]/slider:h-7 group-data-[orientation=vertical]/slider:w-7",
  },
  track: {
    xs: "group-data-[orientation=horizontal]/slider:h-0.5 group-data-[orientation=vertical]/slider:w-0.5",
    sm: "group-data-[orientation=horizontal]/slider:h-1 group-data-[orientation=vertical]/slider:w-1",
    md: "group-data-[orientation=horizontal]/slider:h-1.5 group-data-[orientation=vertical]/slider:w-1.5",
    lg: "group-data-[orientation=horizontal]/slider:h-2 group-data-[orientation=vertical]/slider:w-2",
    xl: "group-data-[orientation=horizontal]/slider:h-2.5 group-data-[orientation=vertical]/slider:w-2.5",
  },
  thumb: {
    xs: "size-2.5",
    sm: "size-3",
    md: "size-4",
    lg: "size-4.5",
    xl: "size-5",
  },
  label: {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
    xl: "text-base",
  },
  valueText: {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
    xl: "text-base",
  },
} as const satisfies Record<string, Record<SliderSize, string>>;

export const sliderColorData = {
  range: {
    ...byColor((color) => `bg-${color}`),
    neutral: "bg-inverted",
  },
} as const satisfies Record<string, Record<SliderColor, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface SliderThumbCompound {
  color?: SliderColor;
  class: string;
}

export const sliderThumbCompoundData: SliderThumbCompound[] = [
  ...eachColor((color) => ({ color, class: `outline-${color}/25 ring-${color}` })),
  { color: "neutral", class: "ring-inverted outline-inverted/25" },
];

/** A tick under the track, at a value on the scale. */
export interface SliderMarkData {
  /** Where on the scale it sits. */
  value: number;
  /** What it says. Without one the mark is a bare tick. */
  label?: string;
}

/** Everything a Slider thumb accepts in both frameworks. */
export interface SliderThumbProps {
  /** Which value it drags, counting from zero. */
  index: number;
}

/** Everything a Slider tick accepts in both frameworks. */
export interface SliderMarkerProps {
  /** Where on the scale it sits. */
  value: number;
}

/**
 * Everything the Slider root accepts in both frameworks.
 *
 * @remarks
 * The value is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. It is an array in both,
 * with one entry per thumb, which is what makes a range slider the same component.
 */
export interface SliderRootProps {
  color?: SliderColor;
  size?: SliderSize;
  /** Text above the track, which also names it for a screen reader. */
  label?: string;
  /** Show the value beside the label. @defaultValue `false` */
  showValue?: boolean;
  /** Ticks under the track. */
  marks?: SliderMarkData[];
  /** @defaultValue `0` */
  min?: number;
  /** @defaultValue `100` */
  max?: number;
  /** @defaultValue `1` */
  step?: number;
  /** @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /**
   * Where the selected range is measured from. @defaultValue `"start"`
   *
   * @remarks
   * Two rather than the three zag names, because Ark's Vue root takes two and a prop
   * that typechecks in React and not in Vue is not one prop.
   */
  origin?: "start" | "center";
  /** How close two thumbs may get, in steps. @defaultValue `0` */
  minStepsBetweenThumbs?: number;
  disabled?: boolean;
  readOnly?: boolean;
  /** Marks the slider invalid for assistive technology. */
  invalid?: boolean;
  /** Submits the value under this name inside a form. */
  name?: string;
}
