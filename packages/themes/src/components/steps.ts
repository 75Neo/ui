import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Steps: a row of numbered triggers and the panel the current one
 * shows, with back and next buttons underneath.
 *
 * @remarks
 * Orientation is not a variant. Every slot styles itself off the `data-orientation`
 * attribute Ark sets, which is what the Tabs do for the same reason.
 *
 * Complete and current are not variants either. Ark writes `data-complete` and
 * `data-current` on the trigger, the indicator and the separator, so one resolved
 * class string covers a step's whole journey and moving between steps never
 * re-resolves.
 *
 * The current step's title takes the color on the trigger itself rather than on the
 * title slot, because `data-current` sits on the trigger and the title inherits it.
 * A group selector would need its own safelist line for no gain.
 *
 * Ark disables the back button on the first step and the next button once the last
 * one completes, with the real `disabled` attribute on both, so those two slots are
 * styled with `disabled:`. The step triggers themselves are never disabled — in
 * linear mode Ark just ignores their clicks — so they carry no disabled style.
 *
 * The completed fill is `data-complete:bg-…` and the current ring is
 * `data-current:ring-…`, both safelisted in `src/tokens/utilities.css`.
 */
export const steps = tv({
  slots: {
    base: "flex min-w-0 flex-col gap-4",
    list: "flex min-w-0 gap-2 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    item: "flex min-w-0 flex-1 items-center gap-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    trigger:
      "group flex min-w-0 cursor-pointer items-center gap-2.5 text-toned transition-colors outline-none select-none hover:text-highlighted focus-visible:outline-3 data-[orientation=vertical]:self-start",
    indicator:
      "flex shrink-0 items-center justify-center rounded-full bg-default font-semibold text-muted ring ring-accented transition-colors ring-inset",
    wrapper: "flex min-w-0 flex-1 flex-col",
    title: "truncate font-medium",
    description: "truncate text-muted",
    separator:
      "rounded-full bg-accented transition-colors data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:min-w-4 data-[orientation=horizontal]:flex-1 data-[orientation=vertical]:ms-4 data-[orientation=vertical]:min-h-4 data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:self-stretch",
    content: "min-w-0 text-toned",
    completedContent: "min-w-0 rounded-lg bg-muted text-toned",
    actions: "flex items-center justify-between gap-2",
    prevTrigger:
      "inline-flex cursor-pointer items-center justify-center rounded-md font-medium text-toned ring ring-accented transition-colors outline-none ring-inset hover:bg-elevated hover:text-highlighted focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
    nextTrigger:
      "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors outline-none focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
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
        trigger: "text-sm",
        indicator: "size-7 text-xs",
        title: "text-sm",
        description: "text-xs",
        content: "text-sm/6",
        completedContent: "p-3 text-sm/6",
        prevTrigger: "gap-1.5 px-3 py-1.5 text-xs",
        nextTrigger: "gap-1.5 px-3 py-1.5 text-xs",
      },
      md: {
        trigger: "text-sm",
        indicator: "size-8 text-sm",
        title: "text-sm",
        description: "text-xs",
        content: "text-sm/6",
        completedContent: "p-4 text-sm/6",
        prevTrigger: "gap-1.5 px-3.5 py-2 text-sm",
        nextTrigger: "gap-1.5 px-3.5 py-2 text-sm",
      },
      lg: {
        trigger: "text-base",
        indicator: "size-9 text-sm",
        title: "text-base",
        description: "text-sm",
        content: "text-base/7",
        completedContent: "p-5 text-base/7",
        prevTrigger: "gap-2 px-4 py-2 text-sm",
        nextTrigger: "gap-2 px-4 py-2 text-sm",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        trigger: `outline-${color}/25 data-current:text-${color}`,
        indicator: `data-complete:bg-${color} data-complete:text-inverted data-complete:ring-transparent data-current:text-${color} data-current:ring-${color} data-current:ring-2`,
        separator: `data-complete:bg-${color}`,
        prevTrigger: `outline-${color}/25`,
        nextTrigger: `bg-${color} text-inverted outline-${color}/25 hover:bg-${color}/75 disabled:bg-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        trigger: "outline-inverted/25 data-current:text-highlighted",
        indicator:
          "data-complete:bg-inverted data-complete:text-inverted data-complete:ring-transparent data-current:text-highlighted data-current:ring-2 data-current:ring-inverted",
        separator: "data-complete:bg-inverted",
        prevTrigger: "outline-inverted/25",
        nextTrigger:
          "bg-inverted text-inverted outline-inverted/25 hover:bg-inverted/90 disabled:bg-inverted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type StepsVariants = VariantProps<typeof steps>;
export type StepsSlots = keyof ReturnType<typeof steps>;

export type StepsUI = TVSlot<StepsSlots>;

export type StepsTheme = ThemeOverride<StepsSlots, StepsVariants>;

/** One step: the trigger that jumps to it and the panel it shows. */
export interface StepsItem {
  /** Trigger text beside the number. */
  title: string;
  /** A quieter line under the title. */
  description?: string;
  /** Panel text, shown while the step is current. */
  content?: string;
}

/**
 * Everything a Steps accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * The current step is not here: React spells it `step` with `onStepChange`, Vue
 * spells it `v-model:step`, so each adapter takes it from Ark's root instead.
 *
 * A step's panel is a string on the item, and anything richer goes through the
 * adapter's own escape hatch: `renderContent` in React, the scoped `content` slot in
 * Vue. The Tabs take panels the same way.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface StepsProps {
  /** Per-slot class overrides. */
  ui?: StepsUI;
  color?: StepsVariants["color"];
  size?: StepsVariants["size"];
  /** The steps to render, in order. */
  items: StepsItem[];
  /** @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /** Whether the steps must be completed in order. @defaultValue `false` */
  linear?: boolean;
  /** Back button text. @defaultValue `"Back"` */
  prevLabel?: string;
  /** Next button text. @defaultValue `"Next"` */
  nextLabel?: string;
  /** Shown once every step is done, in place of the last panel. */
  completedContent?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type StepsVariantsAreExposed = MustBeNever<Exclude<keyof StepsVariants, keyof StepsProps>>;

declare global {
  interface Neo75ComponentThemes {
    steps: ComponentContract<StepsSlots, StepsVariants>;
  }
}
