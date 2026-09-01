import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * The dial is an SVG ring with the readout sitting inside it.
 *
 * `range` is a second circle over `track`, drawn with `pathLength="360"` so one user unit
 * is one degree. That is what lets `stroke-dasharray: var(--value) 360` read Ark's raw
 * `--value` straight off the root with no arithmetic, and it is why the arc needs no
 * per-size tuning: the stroke lives in viewBox units, so every size gets the same ring
 * proportions for free. A round `stroke-linecap` gives the arc the capsule ends.
 *
 * Ark sets `rotate: var(--angle)` inline on the thumb and
 * `rotate: calc(var(--marker-display-value) * 1deg)` on each marker, and `rotate` spins an
 * element about its own origin -- so a dot parked on the rim would only spin in place. The
 * usual fix is a per-size `transform-origin` computed from the radius. Instead `thumb` and
 * `marker` are full-size overlays already centred on the control, with the visible dot
 * drawn as a `::before` sized and offset in percentages. Rotating the overlay orbits the
 * dot, and because every offset is a percentage of the dial, a size variant changes only
 * the width of the control.
 *
 * The overlays would otherwise swallow every click, and Zag reads
 * `composedPath().includes(thumbEl)` to choose grab-and-drag over jump-to-this-angle.
 * `pointer-events-none` on the overlay with `before:pointer-events-auto` on the dot keeps
 * both gestures: the dot is grabbable, the rest of the dial is not.
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

/**
 * The radius and the normalized path length the adapters draw both circles with.
 *
 * They belong here rather than in either adapter because they are half of the geometry the
 * recipe above encodes: `ANGLE_SLIDER_PATH_LENGTH` is what makes one user unit one degree,
 * so `range`'s dash array can be Ark's `--value` unchanged, and `ANGLE_SLIDER_RADIUS` is
 * picked so a 12-unit stroke sits flush inside the 100-unit viewBox.
 */
export const ANGLE_SLIDER_RADIUS = 44;
export const ANGLE_SLIDER_PATH_LENGTH = 360;

export type AngleSliderVariants = VariantProps<typeof angleSlider>;
export type AngleSliderSlots = keyof ReturnType<typeof angleSlider>;

export type AngleSliderUI = TVSlot<AngleSliderSlots>;

export type AngleSliderTheme = ThemeOverride<AngleSliderSlots, AngleSliderVariants>;

/**
 * Everything an AngleSlider accepts that is not framework-specific.
 *
 * Unlike `AccordionProps<F>` and `ButtonProps<F>` this takes no icon parameter: the dial
 * renders no icons, so there would be nothing for `F` to be.
 *
 * The value is missing on purpose. It is the one thing the two frameworks genuinely spell
 * differently -- `value` / `defaultValue` / `onValueChange` in React against `v-model` in
 * Vue -- so each adapter picks it up from Ark's own root props rather than restating a
 * shared shape neither of them would use as written.
 *
 * The variant props are written out rather than derived from the recipe because
 * `@vue/compiler-sfc` resolves `defineProps` types from source alone: it cannot evaluate
 * the recipe's inferred type, so neither `VariantProps<typeof angleSlider>` nor a mapped
 * type over `angleSlider.variants` reaches Vue as finite keys.
 * `AngleSliderVariantsAreExposed` below closes the gap that leaves.
 */
export interface AngleSliderProps {
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

/**
 * Compile-time guard: adding a variant to the recipe without adding the matching
 * prop above is a type error here rather than a prop that silently does nothing.
 */
export type AngleSliderVariantsAreExposed = MustBeNever<
  Exclude<keyof AngleSliderVariants, keyof AngleSliderProps>
>;

declare global {
  interface Neo75ComponentThemes {
    angleSlider: ComponentContract<AngleSliderSlots, AngleSliderVariants>;
  }
}
