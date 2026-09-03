import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { byColor, eachColor } from "../colors";

/**
 * Recipe for the Slider: a track, the part of it that is selected, and a thumb per
 * value.
 *
 * @remarks
 * Orientation is not a variant, for the reason it is not one on the Progress: Ark writes
 * `data-orientation` on every part and the recipe styles itself off it, which keeps the
 * matrix at thirty five rather than seventy.
 *
 * The thumb and the markers are sized here and positioned by Ark, which writes
 * `position`, an offset along the axis and a `translate` that centres them on it, all
 * inline. So nothing in this recipe may offset or translate either: a Tailwind
 * `translate-x-*` sets a different property than Ark's inline `translate` and the two
 * would compose into a double shift rather than replacing one another.
 *
 * A range with two thumbs is the same recipe: Ark renders one thumb per value and the
 * range between the outermost two, so nothing about the styling counts them.
 */
export const slider = tv({
  slots: {
    base: "group/slider flex min-w-0 gap-2 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-col data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-row-reverse",
    header: "flex min-w-0 items-center justify-between gap-2",
    label: "min-w-0 truncate font-medium text-highlighted select-none",
    valueText: "shrink-0 text-muted tabular-nums",
    control:
      "relative flex touch-none select-none group-data-[orientation=horizontal]/slider:w-full group-data-[orientation=horizontal]/slider:items-center group-data-[orientation=vertical]/slider:h-full group-data-[orientation=vertical]/slider:justify-center data-disabled:cursor-not-allowed data-disabled:opacity-75",
    track:
      "overflow-hidden rounded-full bg-accented group-data-[orientation=horizontal]/slider:w-full group-data-[orientation=vertical]/slider:h-full",
    range:
      "rounded-full group-data-[orientation=horizontal]/slider:h-full group-data-[orientation=vertical]/slider:w-full data-disabled:bg-accented",
    thumb:
      "rounded-full bg-default shadow-sm ring-2 transition-shadow outline-none focus-visible:outline-3 data-disabled:cursor-not-allowed",
    markerGroup:
      "group-data-[orientation=horizontal]/slider:mt-1 group-data-[orientation=horizontal]/slider:w-full group-data-[orientation=vertical]/slider:ms-2 group-data-[orientation=vertical]/slider:h-full",
    marker: "text-xs text-dimmed tabular-nums data-[state=under-value]:text-muted",
  },
  variants: {
    color: {
      ...byColor((color) => ({ range: `bg-${color}` })),
      neutral: { range: "bg-inverted" },
    },
    size: {
      xs: {
        control:
          "group-data-[orientation=horizontal]/slider:h-3 group-data-[orientation=vertical]/slider:w-3",
        track:
          "group-data-[orientation=horizontal]/slider:h-0.5 group-data-[orientation=vertical]/slider:w-0.5",
        thumb: "size-2.5",
        label: "text-xs",
        valueText: "text-xs",
      },
      sm: {
        control:
          "group-data-[orientation=horizontal]/slider:h-4 group-data-[orientation=vertical]/slider:w-4",
        track:
          "group-data-[orientation=horizontal]/slider:h-1 group-data-[orientation=vertical]/slider:w-1",
        thumb: "size-3",
        label: "text-xs",
        valueText: "text-xs",
      },
      md: {
        control:
          "group-data-[orientation=horizontal]/slider:h-5 group-data-[orientation=vertical]/slider:w-5",
        track:
          "group-data-[orientation=horizontal]/slider:h-1.5 group-data-[orientation=vertical]/slider:w-1.5",
        thumb: "size-4",
        label: "text-sm",
        valueText: "text-sm",
      },
      lg: {
        control:
          "group-data-[orientation=horizontal]/slider:h-6 group-data-[orientation=vertical]/slider:w-6",
        track:
          "group-data-[orientation=horizontal]/slider:h-2 group-data-[orientation=vertical]/slider:w-2",
        thumb: "size-4.5",
        label: "text-sm",
        valueText: "text-sm",
      },
      xl: {
        control:
          "group-data-[orientation=horizontal]/slider:h-7 group-data-[orientation=vertical]/slider:w-7",
        track:
          "group-data-[orientation=horizontal]/slider:h-2.5 group-data-[orientation=vertical]/slider:w-2.5",
        thumb: "size-5",
        label: "text-base",
        valueText: "text-base",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { thumb: `outline-${color}/25 ring-${color}` },
    })),
    { color: "neutral", class: { thumb: "ring-inverted outline-inverted/25" } },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type SliderVariants = VariantProps<typeof slider>;
export type SliderSlots = keyof ReturnType<typeof slider>;

export type SliderUI = TVSlot<SliderSlots>;

export type SliderTheme = ThemeOverride<SliderSlots, SliderVariants>;

/** A tick under the track, at a value on the scale. */
export interface SliderMark {
  /** Where on the scale it sits. */
  value: number;
  /** What it says. Without one the mark is a bare tick. */
  label?: string;
}

/**
 * Everything a Slider accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * There is no icon type parameter, because nothing here takes an icon.
 *
 * The value is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. It is an array in both,
 * with one entry per thumb, which is what makes a range slider the same component.
 */
export interface SliderProps {
  /** Per-slot class overrides. */
  ui?: SliderUI;
  color?: SliderVariants["color"];
  size?: SliderVariants["size"];
  /** Text above the track, which also names it for a screen reader. */
  label?: string;
  /** Show the value beside the label. @defaultValue `false` */
  showValue?: boolean;
  /** Ticks under the track. */
  marks?: SliderMark[];
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
  /** Id of the form to submit with, for a slider rendered outside it. */
  form?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type SliderVariantsAreExposed = MustBeNever<
  Exclude<keyof SliderVariants, keyof SliderProps>
>;

declare global {
  interface Neo75ComponentThemes {
    slider: ComponentContract<SliderSlots, SliderVariants>;
  }
}
