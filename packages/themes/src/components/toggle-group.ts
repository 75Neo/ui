import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the ToggleGroup: a row of toggles with coordinated selection.
 *
 * @remarks
 * This is the Toggle's spend on the SegmentGroup's geometry: each item paints itself
 * pressed exactly the way a lone toggle does, so the two look like siblings, while
 * the root is a plain row rather than a track with a sliding pill. Nothing slides
 * because each item holds its own state instead of one choice moving between them.
 *
 * Disabled is spelled two ways on purpose. The root is a `div` carrying only
 * `data-disabled`, while each item is a real `button` with the `disabled` attribute,
 * and each slot styles the one its element actually carries.
 *
 * Pressed is not a variant, for the same reason it is not one on the Toggle: Ark
 * writes `data-pressed` on each item, so one resolved class string covers both states.
 */
export const toggleGroup = tv({
  slots: {
    base: "inline-flex gap-1 data-disabled:cursor-not-allowed data-disabled:opacity-75 data-[orientation=vertical]:flex-col",
    item: "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
    leadingIcon: "shrink-0 [&>svg]:size-full",
    itemText: "truncate",
  },
  variants: {
    variant: {
      solid: "",
      outline: "",
      soft: "",
      subtle: "",
      ghost: "",
    },
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
        item: "gap-1.5 px-2.5 py-1.5 text-xs",
        leadingIcon: "size-4",
      },
      md: {
        item: "gap-1.5 px-2.5 py-1.5 text-sm",
        leadingIcon: "size-5",
      },
      lg: {
        item: "gap-2 px-3 py-2 text-sm",
        leadingIcon: "size-5",
      },
    },
    /** Which way the items run. */
    orientation: {
      horizontal: {},
      vertical: {},
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { item: `outline-${color}/25` },
    })),
    { color: "neutral", class: { item: "outline-inverted/25" } },
    ...eachColor((color) => ({
      color,
      variant: "solid" as const,
      class: {
        item: `bg-elevated text-default hover:bg-accented data-pressed:bg-${color} data-pressed:text-inverted`,
      },
    })),
    {
      color: "neutral",
      variant: "solid",
      class: {
        item: "bg-elevated text-default hover:bg-accented data-pressed:bg-inverted data-pressed:text-inverted",
      },
    },
    ...eachColor((color) => ({
      color,
      variant: "outline" as const,
      class: {
        item: `text-toned ring ring-accented ring-inset hover:bg-elevated hover:text-highlighted data-pressed:bg-${color}/10 data-pressed:text-${color}`,
      },
    })),
    {
      color: "neutral",
      variant: "outline",
      class: {
        item: "text-toned ring ring-accented ring-inset hover:bg-elevated hover:text-highlighted data-pressed:bg-elevated data-pressed:text-highlighted",
      },
    },
    ...eachColor((color) => ({
      color,
      variant: "soft" as const,
      class: {
        item: `bg-muted text-toned hover:bg-accented/60 data-pressed:bg-${color}/10 data-pressed:text-${color}`,
      },
    })),
    {
      color: "neutral",
      variant: "soft",
      class: {
        item: "bg-muted text-default hover:bg-accented/60 data-pressed:bg-accented data-pressed:text-highlighted",
      },
    },
    ...eachColor((color) => ({
      color,
      variant: "subtle" as const,
      class: {
        item: `bg-muted text-toned ring ring-accented ring-inset hover:bg-accented/60 data-pressed:bg-${color}/10 data-pressed:text-${color} data-pressed:ring-transparent`,
      },
    })),
    {
      color: "neutral",
      variant: "subtle",
      class: {
        item: "bg-muted text-default ring ring-accented ring-inset hover:bg-accented/60 data-pressed:bg-accented data-pressed:text-highlighted data-pressed:ring-transparent",
      },
    },
    ...eachColor((color) => ({
      color,
      variant: "ghost" as const,
      class: {
        item: `text-toned hover:bg-elevated hover:text-highlighted data-pressed:bg-${color}/10 data-pressed:text-${color}`,
      },
    })),
    {
      color: "neutral",
      variant: "ghost",
      class: {
        item: "text-toned hover:bg-elevated hover:text-highlighted data-pressed:bg-elevated data-pressed:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    variant: "soft",
    color: "primary",
    size: "md",
    orientation: "horizontal",
  },
});

export type ToggleGroupVariants = VariantProps<typeof toggleGroup>;
export type ToggleGroupSlots = keyof ReturnType<typeof toggleGroup>;

export type ToggleGroupUI = TVSlot<ToggleGroupSlots>;

export type ToggleGroupTheme = ThemeOverride<ToggleGroupSlots, ToggleGroupVariants>;

/**
 * One toggle in the group.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 */
export interface ToggleGroupItem<F> {
  /** Identifies the item. Submitted when the item is pressed. */
  value: string;
  /** What the item says. An item with no label and no icon is an empty button. */
  label?: string;
  /** Icon shown before the label. */
  icon?: F;
  disabled?: boolean;
}

/**
 * Everything a ToggleGroup accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The selection is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface ToggleGroupProps<F> {
  /** Per-slot class overrides. */
  ui?: ToggleGroupUI;
  variant?: ToggleGroupVariants["variant"];
  color?: ToggleGroupVariants["color"];
  size?: ToggleGroupVariants["size"];
  /** Which way the items run. @defaultValue `"horizontal"` */
  orientation?: ToggleGroupVariants["orientation"];
  /** The toggles to offer, in order. */
  items: ToggleGroupItem<F>[];
  /** Whether several items may be pressed at once. @defaultValue `false` */
  multiple?: boolean;
  /**
   * Whether a pressed item can be pressed again to release it.
   * Ignored while `multiple` is on. @defaultValue `true`
   */
  deselectable?: boolean;
  disabled?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ToggleGroupVariantsAreExposed = MustBeNever<
  Exclude<keyof ToggleGroupVariants, keyof ToggleGroupProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    toggleGroup: ComponentContract<ToggleGroupSlots, ToggleGroupVariants>;
  }
}
