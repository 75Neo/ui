import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the AngleSlider: an SVG ring with the readout inside it.
 *
 * @remarks
 * The geometry is written in percentages and viewBox units, so a size variant only
 * changes the width of the control and everything else follows. Two consequences worth
 * knowing before editing: `range` is drawn with a path length of 360 so its dash array
 * can read Ark's raw angle with no arithmetic, and the thumb and markers are full-size
 * overlays whose visible dot is a `::before`, so rotating the overlay orbits the dot.
 * The overlays stay click-through and only the dot takes pointer events, which is what
 * keeps both dragging the thumb and clicking the ring working.
 */
export const angleSlider = tv({
  slots: {
    base: "inline-flex data-disabled:pointer-events-none data-disabled:opacity-50",
    control: "relative aspect-square",
    dial: "absolute inset-0 size-full origin-center -rotate-90",
    track: "fill-none stroke-(--ui-bg-elevated) stroke-12",
    range: "fill-none stroke-12 [stroke-dasharray:var(--value)_360] [stroke-linecap:round]",
    markers: "pointer-events-none absolute inset-0",
    marker:
      "absolute inset-0 before:absolute before:top-[3.5%] before:left-1/2 before:size-[5%] before:-translate-x-1/2 before:rounded-full before:bg-default before:content-['']",
    thumb:
      "pointer-events-none absolute inset-0 outline-none before:pointer-events-auto before:absolute before:top-[-2%] before:left-1/2 before:size-[16%] before:-translate-x-1/2 before:rounded-full before:shadow-sm before:content-['']",
    content: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
    value: "font-semibold tabular-nums",
    label: "pointer-events-auto cursor-pointer text-muted select-none",
  },
  variants: {
    size: {
      sm: {
        control: "w-24",
        value: "text-base/none",
        label: "mt-1 text-[0.625rem]/none",
      },
      md: {
        control: "w-32",
        value: "text-2xl/none",
        label: "mt-1.5 text-xs/none",
      },
      lg: {
        control: "w-40",
        value: "text-3xl/none",
        label: "mt-2 text-sm/none",
      },
    },
    color: {
      primary: {
        range: "stroke-primary",
        thumb:
          "before:bg-primary-elevated focus-visible:before:ring-[3px] focus-visible:before:ring-primary/50",
        value: "text-primary-emphasis",
      },
      secondary: {
        range: "stroke-secondary",
        thumb:
          "before:bg-secondary-elevated focus-visible:before:ring-[3px] focus-visible:before:ring-secondary/50",
        value: "text-secondary-emphasis",
      },
      neutral: {
        range: "stroke-neutral",
        thumb:
          "before:bg-neutral-elevated focus-visible:before:ring-[3px] focus-visible:before:ring-neutral/50",
        value: "text-neutral-emphasis",
      },
      success: {
        range: "stroke-success",
        thumb:
          "before:bg-success-elevated focus-visible:before:ring-[3px] focus-visible:before:ring-success/50",
        value: "text-success-emphasis",
      },
      info: {
        range: "stroke-info",
        thumb:
          "before:bg-info-elevated focus-visible:before:ring-[3px] focus-visible:before:ring-info/50",
        value: "text-info-emphasis",
      },
      warning: {
        range: "stroke-warning",
        thumb:
          "before:bg-warning-elevated focus-visible:before:ring-[3px] focus-visible:before:ring-warning/50",
        value: "text-warning-emphasis",
      },
      error: {
        range: "stroke-error",
        thumb:
          "before:bg-error-elevated focus-visible:before:ring-[3px] focus-visible:before:ring-error/50",
        value: "text-error-emphasis",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

/** Ring radius, chosen so a 12-unit stroke sits flush inside the 100-unit viewBox. */
export const ANGLE_SLIDER_RADIUS = 44;

/** Path length both circles are normalized to, which makes one user unit one degree. */
export const ANGLE_SLIDER_PATH_LENGTH = 360;

export type AngleSliderVariants = VariantProps<typeof angleSlider>;
export type AngleSliderSlots = keyof ReturnType<typeof angleSlider>;

export type AngleSliderUI = TVSlot<AngleSliderSlots>;

export type AngleSliderTheme = ThemeOverride<AngleSliderSlots, AngleSliderVariants>;

/**
 * Everything an AngleSlider accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @remarks
 * The angle itself is not here: React spells it `value` and `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead. There is no icon type
 * parameter either, because the dial renders no icons. The variant props are written
 * out by hand because `defineProps` in Vue cannot read them off the recipe, and the
 * guard below keeps them in step.
 */
export interface AngleSliderProps {
  /** Per-slot class overrides. */
  ui?: AngleSliderUI;
  size?: AngleSliderVariants["size"];
  color?: AngleSliderVariants["color"];
  /** Caption under the readout, inside the ring. Clicking it focuses the thumb. */
  label?: string;
  /** Show the current angle in the middle of the ring. */
  showValue?: boolean;
  /** Tick values in degrees, drawn on the ring. */
  markers?: number[];
  /** Degrees per arrow-key press. */
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  /** Submits the angle under this name inside a form. */
  name?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type AngleSliderVariantsAreExposed = MustBeNever<
  Exclude<keyof AngleSliderVariants, keyof AngleSliderProps>
>;

declare global {
  interface Neo75ComponentThemes {
    angleSlider: ComponentContract<AngleSliderSlots, AngleSliderVariants>;
  }
}
