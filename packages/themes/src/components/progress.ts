import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { byColor } from "../colors";

/**
 * Recipe for the Progress: a track, and the part of it that is done.
 *
 * @remarks
 * Orientation is not a variant. Ark writes `data-orientation` on every part, so the
 * recipe styles itself off it and the matrix stays at thirty five rather than seventy,
 * which is what the Accordion and the Tabs do.
 *
 * Neither is the indeterminate state. Ark writes `data-state="indeterminate"` on the
 * range when the value is null, which is when the bar sweeps across the track instead of
 * measuring anything. The range goes absolute for that, which is what the track's
 * `relative` is for, and there is one keyframe per axis because a keyframe cannot ask
 * which way its element is pointing. They are the only pair in the library that loops.
 *
 * `size` is thickness rather than length. A progress bar fills whatever it is put in,
 * and asking a caller to choose between five widths would be answering a question they
 * did not ask.
 */
export const progress = tv({
  slots: {
    base: "group/progress flex min-w-0 gap-2 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-col data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-row-reverse",
    header: "flex min-w-0 items-center justify-between gap-2",
    label: "min-w-0 truncate font-medium text-highlighted",
    valueText: "shrink-0 text-muted tabular-nums",
    track:
      "relative overflow-hidden rounded-full bg-accented group-data-[orientation=horizontal]/progress:w-full group-data-[orientation=vertical]/progress:h-full",
    range:
      "rounded-full transition-[inline-size,block-size] duration-200 group-data-[orientation=horizontal]/progress:h-full group-data-[orientation=vertical]/progress:w-full data-[state=indeterminate]:absolute group-data-[orientation=horizontal]/progress:data-[state=indeterminate]:animate-progress-sweep group-data-[orientation=vertical]/progress:data-[state=indeterminate]:animate-progress-sweep-block",
  },
  variants: {
    color: {
      ...byColor((color) => ({ range: `bg-${color}` })),
      neutral: { range: "bg-inverted" },
    },
    size: {
      xs: {
        track:
          "group-data-[orientation=horizontal]/progress:h-0.5 group-data-[orientation=vertical]/progress:w-0.5",
        label: "text-xs",
        valueText: "text-xs",
      },
      sm: {
        track:
          "group-data-[orientation=horizontal]/progress:h-1 group-data-[orientation=vertical]/progress:w-1",
        label: "text-xs",
        valueText: "text-xs",
      },
      md: {
        track:
          "group-data-[orientation=horizontal]/progress:h-2 group-data-[orientation=vertical]/progress:w-2",
        label: "text-sm",
        valueText: "text-sm",
      },
      lg: {
        track:
          "group-data-[orientation=horizontal]/progress:h-2.5 group-data-[orientation=vertical]/progress:w-2.5",
        label: "text-sm",
        valueText: "text-sm",
      },
      xl: {
        track:
          "group-data-[orientation=horizontal]/progress:h-3 group-data-[orientation=vertical]/progress:w-3",
        label: "text-base",
        valueText: "text-base",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type ProgressVariants = VariantProps<typeof progress>;
export type ProgressSlots = keyof ReturnType<typeof progress>;

export type ProgressUI = TVSlot<ProgressSlots>;

export type ProgressTheme = ThemeOverride<ProgressSlots, ProgressVariants>;

/**
 * Everything a Progress accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * There is no icon type parameter, because a bar has nowhere to put an icon.
 *
 * The value is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. `null` is the
 * indeterminate state in both, and is what a bar shows while it has nothing to measure.
 */
export interface ProgressProps {
  /** Per-slot class overrides. */
  ui?: ProgressUI;
  color?: ProgressVariants["color"];
  size?: ProgressVariants["size"];
  /** Text above the bar, which also names it for a screen reader. */
  label?: string;
  /** Show the value beside the label. @defaultValue `false` */
  showValue?: boolean;
  /** @defaultValue `0` */
  min?: number;
  /** @defaultValue `100` */
  max?: number;
  /** @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /** How the value is written out. @defaultValue `{ style: "percent" }` */
  formatOptions?: Intl.NumberFormatOptions;
  /** Which locale writes it. @defaultValue `"en-US"` */
  locale?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ProgressVariantsAreExposed = MustBeNever<
  Exclude<keyof ProgressVariants, keyof ProgressProps>
>;

declare global {
  interface Neo75ComponentThemes {
    progress: ComponentContract<ProgressSlots, ProgressVariants>;
  }
}
