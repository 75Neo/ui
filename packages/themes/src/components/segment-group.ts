import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the SegmentGroup: a track of options with a pill that slides to the chosen
 * one.
 *
 * @remarks
 * `base` is the track itself, not a wrapper around it, and there is no label slot. A
 * segmented control is a compact switch rather than a form field with a caption, and
 * making the root the track is what lets the pill be positioned against it: Ark measures
 * the chosen option's offset from its `offsetParent`, so the pill and the options have
 * to share one.
 *
 * The pill is placed with the physical `left` and `top` Ark measures, not with logical
 * properties. An offset is measured from the left edge of the box whatever the reading
 * direction, so a logical inset would send the pill to the wrong end under a
 * right-to-left locale — the one place in this library where the physical property is
 * the correct one.
 *
 * The accent reaches the chosen option's text and nothing else. The pill is the surface
 * colour, so the row reads as one control with a position in it, which is the same
 * decision the Pagination makes about its current page.
 */
export const segmentGroup = tv({
  slots: {
    base: "relative isolate inline-flex rounded-md bg-elevated data-disabled:cursor-not-allowed data-disabled:opacity-75",
    indicator:
      "absolute top-(--top) left-(--left) -z-10 h-(--height) w-(--width) rounded-sm bg-default shadow-sm transition-[left,top,width,height] duration-200",
    item: "inline-flex cursor-pointer items-center justify-center rounded-sm font-medium whitespace-nowrap text-toned transition-colors outline-none select-none hover:text-highlighted data-disabled:cursor-not-allowed data-disabled:opacity-75",
    itemText: "truncate",
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
      sm: { base: "gap-0.5 p-0.5", item: "h-6 px-2 text-xs" },
      md: { base: "gap-1 p-1", item: "h-7 px-3 text-sm" },
      lg: { base: "gap-1 p-1", item: "h-9 px-4 text-sm" },
    },
    /** Which way the options run. */
    orientation: {
      horizontal: { base: "flex-row items-center" },
      vertical: { base: "flex-col items-stretch", item: "justify-start" },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { item: `data-[state=checked]:text-${color}` },
    })),
    {
      color: "neutral",
      class: { item: "data-[state=checked]:text-highlighted" },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    orientation: "horizontal",
  },
});

export type SegmentGroupVariants = VariantProps<typeof segmentGroup>;
export type SegmentGroupSlots = keyof ReturnType<typeof segmentGroup>;

export type SegmentGroupUI = TVSlot<SegmentGroupSlots>;

export type SegmentGroupTheme = ThemeOverride<SegmentGroupSlots, SegmentGroupVariants>;

/**
 * One option in the track.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 */
export interface SegmentGroupItem<F> {
  /** Submitted, and used to identify the option. */
  value: string;
  /** What the option says. */
  label: string;
  disabled?: boolean;
  /** Icon shown before the label. */
  icon?: F;
}

/**
 * Everything a SegmentGroup accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The choice is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. A track that starts with
 * nothing chosen simply has no pill, which Ark handles by hiding it rather than by
 * placing it nowhere.
 *
 * There is no prop for wrapping the arrow keys. Ark's segment group is its radio group
 * underneath and neither offers one, and inventing a prop this library could not honour
 * would be worse than leaving the behaviour where Ark put it.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface SegmentGroupProps<F> {
  /** Per-slot class overrides. */
  ui?: SegmentGroupUI;
  color?: SegmentGroupVariants["color"];
  size?: SegmentGroupVariants["size"];
  /** Which way the options run. @defaultValue `"horizontal"` */
  orientation?: SegmentGroupVariants["orientation"];
  /** The options to offer. */
  items: SegmentGroupItem<F>[];
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the choice under this name inside a form. */
  name?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type SegmentGroupVariantsAreExposed = MustBeNever<
  Exclude<keyof SegmentGroupVariants, keyof SegmentGroupProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    segmentGroup: ComponentContract<SegmentGroupSlots, SegmentGroupVariants>;
  }
}
