import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the ColorPicker: a saturation plane, the channel sliders beside a preview
 * of the current color, a hex field, and an optional row of presets.
 *
 * @remarks
 * The picker is always inline. A popover would need a trigger, a positioner and an open
 * state, and the library has no Popover to hang those on yet; an inline picker drops
 * into one when it arrives.
 *
 * The anatomy is unusually wide — nineteen slots — because the control genuinely has
 * nineteen parts. Every one of them is a slot rather than a nested selector so that a
 * theme can reach the alpha thumb without reaching the hue thumb.
 *
 * Almost nothing here paints a color. Ark writes the gradients, the checkerboard and
 * each thumb's fill as inline styles computed from the current value, so the recipe
 * only ever supplies geometry, rounding, rings and focus. Two consequences follow.
 * Every part Ark positions carries `position: relative` inline, which beats a class, so
 * the parts that must fill their parent do it with `size-full` rather than with
 * `absolute inset-0`. And every box with a filled child wears an outer ring rather than
 * `ring-inset`, since an inset ring paints under its children and the child covers it.
 *
 * The `color` variant is the accent, not the value: it reaches the focus halos, the hex
 * field's focus ring and the ring on the selected preset, and nothing else. The color
 * being edited comes from the value and belongs to no variant.
 *
 * Neither the area nor a slider clips its overflow, on purpose. Both thumbs are
 * centred on their value with a half-width translate, so at either end of a range half
 * the thumb hangs outside its track and clipping would shave it. Nothing needs the clip
 * anyway: the parts that fill those boxes carry `rounded-[inherit]`.
 *
 * Ark spells disabled two ways here. The hex field, the eyedropper and each preset are
 * real buttons and inputs and carry the attribute, so they style with `disabled:`. The
 * two thumbs are divs and carry `data-disabled`, and the root dims and deadens the
 * whole control from its own.
 */
export const colorPicker = tv({
  slots: {
    base: "flex w-full flex-col data-disabled:pointer-events-none data-disabled:opacity-75",
    label: "font-medium text-highlighted select-none",
    area: "relative touch-none rounded-md ring ring-accented",
    areaBackground: "size-full rounded-[inherit]",
    areaThumb: "rounded-full shadow-sm ring-2 ring-bg outline-none focus-visible:outline-3",
    sliders: "flex items-center",
    preview: "relative shrink-0 overflow-hidden rounded-md ring ring-accented",
    transparencyGrid: "rounded-[inherit]",
    valueSwatch: "size-full rounded-[inherit]",
    channels: "flex min-w-0 flex-1 flex-col",
    channelSlider: "relative touch-none rounded-full ring ring-accented",
    channelSliderTrack: "size-full rounded-[inherit]",
    channelSliderThumb:
      "-translate-1/2 rounded-full shadow-sm ring-2 ring-bg outline-none focus-visible:outline-3",
    control: "flex items-center gap-2",
    input:
      "min-w-0 flex-1 rounded-md bg-default font-mono text-toned uppercase ring ring-accented outline-none ring-inset focus-visible:ring-2 disabled:cursor-not-allowed",
    eyeDropper:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md ring ring-accented transition-colors outline-none focus-visible:outline-3 disabled:cursor-not-allowed",
    swatches: "flex flex-wrap",
    swatchTrigger:
      "cursor-pointer rounded-md ring-offset-2 ring-offset-bg outline-none focus-visible:outline-3 disabled:cursor-not-allowed data-[state=checked]:ring-2",
    swatch: "size-full rounded-[inherit]",
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
      sm: {
        base: "max-w-56 gap-2.5",
        label: "text-xs",
        area: "h-28",
        areaThumb: "size-3.5",
        sliders: "gap-2.5",
        preview: "size-7",
        channels: "gap-2",
        channelSlider: "h-2",
        channelSliderThumb: "size-3.5",
        input: "h-7 px-2 text-xs",
        eyeDropper: "size-7 [&>svg]:size-3.5",
        swatches: "gap-1.5",
        swatchTrigger: "size-5",
      },
      md: {
        base: "max-w-64 gap-3",
        label: "text-sm",
        area: "h-36",
        areaThumb: "size-4",
        sliders: "gap-3",
        preview: "size-9",
        channels: "gap-2.5",
        channelSlider: "h-2.5",
        channelSliderThumb: "size-4",
        input: "h-9 px-2.5 text-sm",
        eyeDropper: "size-9 [&>svg]:size-4",
        swatches: "gap-2",
        swatchTrigger: "size-6",
      },
      lg: {
        base: "max-w-72 gap-3.5",
        label: "text-sm",
        area: "h-44",
        areaThumb: "size-4.5",
        sliders: "gap-3.5",
        preview: "size-10",
        channels: "gap-3",
        channelSlider: "h-3",
        channelSliderThumb: "size-4.5",
        input: "h-10 px-3 text-sm",
        eyeDropper: "size-10 [&>svg]:size-5",
        swatches: "gap-2",
        swatchTrigger: "size-7",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        areaThumb: `outline-${color}/25`,
        channelSliderThumb: `outline-${color}/25`,
        input: `outline-${color}/25 focus-visible:ring-${color}`,
        eyeDropper: `text-${color} outline-${color}/25 hover:bg-${color}/10 active:bg-${color}/10`,
        swatchTrigger: `outline-${color}/25 data-[state=checked]:ring-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        areaThumb: "outline-inverted/25",
        channelSliderThumb: "outline-inverted/25",
        input: "outline-inverted/25 focus-visible:ring-inverted",
        eyeDropper:
          "text-muted outline-inverted/25 hover:bg-elevated hover:text-default active:bg-elevated",
        swatchTrigger: "outline-inverted/25 data-[state=checked]:ring-inverted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type ColorPickerVariants = VariantProps<typeof colorPicker>;
export type ColorPickerSlots = keyof ReturnType<typeof colorPicker>;

export type ColorPickerUI = TVSlot<ColorPickerSlots>;

export type ColorPickerTheme = ThemeOverride<ColorPickerSlots, ColorPickerVariants>;

/**
 * The formats a color can be edited and reported in.
 *
 * @remarks
 * Written out rather than imported from Ark, because `@75neo/themes` depends on no
 * framework and so on neither adapter's copy of it. The union is Zag's `ColorFormat`,
 * and a mismatch would fail the adapters' typecheck rather than go unnoticed.
 */
export type ColorPickerFormat = "rgba" | "hsla" | "hsba";

/**
 * Everything a ColorPicker accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The color itself is not here: React spells it `value` with `onValueChange`, Vue
 * spells it `v-model`, so each adapter takes it from Ark's root instead. It is a
 * `Color` object rather than a string in both, because the picker edits channels and a
 * string would be reparsed on every drag. Each adapter re-exports `parseColor` for
 * building one.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface ColorPickerProps<F> {
  /** Per-slot class overrides. */
  ui?: ColorPickerUI;
  color?: ColorPickerVariants["color"];
  size?: ColorPickerVariants["size"];
  /** Caption above the picker. */
  label?: string;
  /** Show the hex field under the sliders. @defaultValue `true` */
  showInput?: boolean;
  /** Add an alpha slider, and a checkerboard under anything the color is painted on. */
  alpha?: boolean;
  /** Show the eyedropper button. It works in Chromium browsers only. */
  eyeDropper?: boolean;
  /** Preset colors offered under the picker, as CSS color strings. */
  swatches?: string[];
  /** Replaces the eyedropper icon. */
  eyeDropperIcon?: F;
  /** The format channel values and the submitted string are read in. */
  format?: ColorPickerFormat;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the color under this name inside a form. */
  name?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ColorPickerVariantsAreExposed = MustBeNever<
  Exclude<keyof ColorPickerVariants, keyof ColorPickerProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    colorPicker: ComponentContract<ColorPickerSlots, ColorPickerVariants>;
  }
}
