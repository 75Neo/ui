import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Toggle: one button that stays down once pressed.
 *
 * @remarks
 * Pressed is not a variant. Ark writes `data-pressed` on the root, so one resolved
 * class string covers both states and pressing never re-resolves — the same reason
 * checked is not a variant on the Switch.
 *
 * The root is a real `button` and Ark passes `disabled` straight onto it, so disabled
 * is styled with `disabled:`. The pressed fill is `data-pressed:bg-…`, which is
 * safelisted in `src/tokens/utilities.css` alongside the soft vocabulary.
 *
 * There is no `Indicator` part in the adapters. The caller's own content stays put
 * and the recipe repaints it in place, which is what makes a toggle read as one
 * button with two looks rather than two buttons taking turns.
 */
export const toggle = tv({
  slots: {
    base: "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
    leadingIcon: "shrink-0 [&>svg]:size-full",
    label: "truncate",
    trailingIcon: "shrink-0 [&>svg]:size-full",
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
        base: "gap-1.5 px-2.5 py-1.5 text-xs",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
      },
      md: {
        base: "gap-1.5 px-2.5 py-1.5 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
      },
      lg: {
        base: "gap-2 px-3 py-2 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { base: `outline-${color}/25` },
    })),
    { color: "neutral", class: { base: "outline-inverted/25" } },
    ...eachColor((color) => ({
      color,
      variant: "solid" as const,
      class: {
        base: `bg-elevated text-default hover:bg-accented data-pressed:bg-${color} data-pressed:text-inverted`,
      },
    })),
    {
      color: "neutral",
      variant: "solid",
      class: {
        base: "bg-elevated text-default hover:bg-accented data-pressed:bg-inverted data-pressed:text-inverted",
      },
    },
    ...eachColor((color) => ({
      color,
      variant: "outline" as const,
      class: {
        base: `text-toned ring ring-accented ring-inset hover:bg-elevated hover:text-highlighted data-pressed:bg-${color}/10 data-pressed:text-${color}`,
      },
    })),
    {
      color: "neutral",
      variant: "outline",
      class: {
        base: "text-toned ring ring-accented ring-inset hover:bg-elevated hover:text-highlighted data-pressed:bg-elevated data-pressed:text-highlighted",
      },
    },
    ...eachColor((color) => ({
      color,
      variant: "soft" as const,
      class: {
        base: `bg-muted text-toned hover:bg-accented/60 data-pressed:bg-${color}/10 data-pressed:text-${color}`,
      },
    })),
    {
      color: "neutral",
      variant: "soft",
      class: {
        base: "bg-muted text-default hover:bg-accented/60 data-pressed:bg-accented data-pressed:text-highlighted",
      },
    },
    ...eachColor((color) => ({
      color,
      variant: "subtle" as const,
      class: {
        base: `bg-muted text-toned ring ring-accented ring-inset hover:bg-accented/60 data-pressed:bg-${color}/10 data-pressed:text-${color} data-pressed:ring-transparent`,
      },
    })),
    {
      color: "neutral",
      variant: "subtle",
      class: {
        base: "bg-muted text-default ring ring-accented ring-inset hover:bg-accented/60 data-pressed:bg-accented data-pressed:text-highlighted data-pressed:ring-transparent",
      },
    },
    ...eachColor((color) => ({
      color,
      variant: "ghost" as const,
      class: {
        base: `text-toned hover:bg-elevated hover:text-highlighted data-pressed:bg-${color}/10 data-pressed:text-${color}`,
      },
    })),
    {
      color: "neutral",
      variant: "ghost",
      class: {
        base: "text-toned hover:bg-elevated hover:text-highlighted data-pressed:bg-elevated data-pressed:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    variant: "soft",
    color: "primary",
    size: "md",
  },
});

export type ToggleVariants = VariantProps<typeof toggle>;
export type ToggleSlots = keyof ReturnType<typeof toggle>;

export type ToggleUI = TVSlot<ToggleSlots>;

export type ToggleTheme = ThemeOverride<ToggleSlots, ToggleVariants>;

/**
 * Everything a Toggle accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The pressed state is not here: React spells it `pressed` with `onPressedChange`,
 * Vue spells it `v-model:pressed`, so each adapter takes it from Ark's root instead.
 *
 * The label is the adapter's own children, not a string prop, because a toggle usually
 * holds an icon rather than a sentence.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface ToggleProps<F> {
  /** Per-slot class overrides. */
  ui?: ToggleUI;
  variant?: ToggleVariants["variant"];
  color?: ToggleVariants["color"];
  size?: ToggleVariants["size"];
  /** Icon shown before the label. */
  leadingIcon?: F;
  /** Icon shown after the label. */
  trailingIcon?: F;
  disabled?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ToggleVariantsAreExposed = MustBeNever<
  Exclude<keyof ToggleVariants, keyof ToggleProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    toggle: ComponentContract<ToggleSlots, ToggleVariants>;
  }
}
