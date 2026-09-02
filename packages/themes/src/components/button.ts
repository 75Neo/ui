import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * A button is one interactive box with three optional children: a leading slot, a
 * label, and a trailing slot. `variant` and `color` are independent -- the four
 * variants each pick a different way to spend a color, and the compound table below
 * holds one entry per pair, which is what `assertRecipeIsTotal` checks.
 *
 * `size` styles `base` directly, while the icon slots pick their size up from
 * `compoundSlots`, so the two icon boxes never drift apart or out of step with the
 * text.
 */
export const button = tv({
  slots: {
    base: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent text-center align-middle font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow] duration-150 outline-none select-none focus-visible:ring-[3px] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    leading: "shrink-0 [&>svg]:size-full",
    trailing: "shrink-0 [&>svg]:size-full",
    label: "min-w-0 truncate",
  },
  variants: {
    variant: {
      solid: {},
      soft: {},
      outline: {},
      ghost: {},
    },
    size: {
      xs: {
        base: "h-6 gap-1 px-2 text-xs",
      },
      sm: {
        base: "h-7 gap-1 px-2.5 text-xs",
      },
      md: {
        base: "h-8 gap-1.5 px-3 text-sm",
      },
      lg: {
        base: "h-9 gap-1.5 px-3.5 text-sm",
      },
      xl: {
        base: "h-10 gap-2 px-4 text-base",
      },
    },
    color: {
      primary: {},
      secondary: {},
      neutral: {},
      success: {},
      info: {},
      warning: {},
      error: {},
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "primary",
      class: {
        base: "bg-primary text-primary-foreground shadow-xs hover:bg-primary-elevated focus-visible:ring-primary/50 active:bg-primary-elevated",
      },
    },
    {
      variant: "solid",
      color: "secondary",
      class: {
        base: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-elevated focus-visible:ring-secondary/50 active:bg-secondary-elevated",
      },
    },
    {
      variant: "solid",
      color: "neutral",
      class: {
        base: "bg-neutral text-neutral-foreground shadow-xs hover:bg-neutral-elevated focus-visible:ring-neutral/50 active:bg-neutral-elevated",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "bg-success text-success-foreground shadow-xs hover:bg-success-elevated focus-visible:ring-success/50 active:bg-success-elevated",
      },
    },
    {
      variant: "solid",
      color: "info",
      class: {
        base: "bg-info text-info-foreground shadow-xs hover:bg-info-elevated focus-visible:ring-info/50 active:bg-info-elevated",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "bg-warning text-warning-foreground shadow-xs hover:bg-warning-elevated focus-visible:ring-warning/50 active:bg-warning-elevated",
      },
    },
    {
      variant: "solid",
      color: "error",
      class: {
        base: "bg-error text-error-foreground shadow-xs hover:bg-error-elevated focus-visible:ring-error/50 active:bg-error-elevated",
      },
    },
    {
      variant: "soft",
      color: "primary",
      class: {
        base: "bg-primary-muted text-primary-emphasis hover:bg-primary-accented focus-visible:ring-primary/50 active:bg-primary-accented",
      },
    },
    {
      variant: "soft",
      color: "secondary",
      class: {
        base: "bg-secondary-muted text-secondary-emphasis hover:bg-secondary-accented focus-visible:ring-secondary/50 active:bg-secondary-accented",
      },
    },
    {
      variant: "soft",
      color: "neutral",
      class: {
        base: "bg-neutral-muted text-neutral-emphasis hover:bg-neutral-accented focus-visible:ring-neutral/50 active:bg-neutral-accented",
      },
    },
    {
      variant: "soft",
      color: "success",
      class: {
        base: "bg-success-muted text-success-emphasis hover:bg-success-accented focus-visible:ring-success/50 active:bg-success-accented",
      },
    },
    {
      variant: "soft",
      color: "info",
      class: {
        base: "bg-info-muted text-info-emphasis hover:bg-info-accented focus-visible:ring-info/50 active:bg-info-accented",
      },
    },
    {
      variant: "soft",
      color: "warning",
      class: {
        base: "bg-warning-muted text-warning-emphasis hover:bg-warning-accented focus-visible:ring-warning/50 active:bg-warning-accented",
      },
    },
    {
      variant: "soft",
      color: "error",
      class: {
        base: "bg-error-muted text-error-emphasis hover:bg-error-accented focus-visible:ring-error/50 active:bg-error-accented",
      },
    },
    {
      variant: "outline",
      color: "primary",
      class: {
        base: "border-primary-emphasis/40 text-primary-emphasis hover:border-primary-emphasis hover:bg-primary-muted focus-visible:ring-primary/50 active:bg-primary-accented",
      },
    },
    {
      variant: "outline",
      color: "secondary",
      class: {
        base: "border-secondary-emphasis/40 text-secondary-emphasis hover:border-secondary-emphasis hover:bg-secondary-muted focus-visible:ring-secondary/50 active:bg-secondary-accented",
      },
    },
    {
      variant: "outline",
      color: "neutral",
      class: {
        base: "border-neutral-emphasis/40 text-neutral-emphasis hover:border-neutral-emphasis hover:bg-neutral-muted focus-visible:ring-neutral/50 active:bg-neutral-accented",
      },
    },
    {
      variant: "outline",
      color: "success",
      class: {
        base: "border-success-emphasis/40 text-success-emphasis hover:border-success-emphasis hover:bg-success-muted focus-visible:ring-success/50 active:bg-success-accented",
      },
    },
    {
      variant: "outline",
      color: "info",
      class: {
        base: "border-info-emphasis/40 text-info-emphasis hover:border-info-emphasis hover:bg-info-muted focus-visible:ring-info/50 active:bg-info-accented",
      },
    },
    {
      variant: "outline",
      color: "warning",
      class: {
        base: "border-warning-emphasis/40 text-warning-emphasis hover:border-warning-emphasis hover:bg-warning-muted focus-visible:ring-warning/50 active:bg-warning-accented",
      },
    },
    {
      variant: "outline",
      color: "error",
      class: {
        base: "border-error-emphasis/40 text-error-emphasis hover:border-error-emphasis hover:bg-error-muted focus-visible:ring-error/50 active:bg-error-accented",
      },
    },
    {
      variant: "ghost",
      color: "primary",
      class: {
        base: "text-primary-emphasis hover:bg-primary-muted focus-visible:ring-primary/50 active:bg-primary-accented",
      },
    },
    {
      variant: "ghost",
      color: "secondary",
      class: {
        base: "text-secondary-emphasis hover:bg-secondary-muted focus-visible:ring-secondary/50 active:bg-secondary-accented",
      },
    },
    {
      variant: "ghost",
      color: "neutral",
      class: {
        base: "text-neutral-emphasis hover:bg-neutral-muted focus-visible:ring-neutral/50 active:bg-neutral-accented",
      },
    },
    {
      variant: "ghost",
      color: "success",
      class: {
        base: "text-success-emphasis hover:bg-success-muted focus-visible:ring-success/50 active:bg-success-accented",
      },
    },
    {
      variant: "ghost",
      color: "info",
      class: {
        base: "text-info-emphasis hover:bg-info-muted focus-visible:ring-info/50 active:bg-info-accented",
      },
    },
    {
      variant: "ghost",
      color: "warning",
      class: {
        base: "text-warning-emphasis hover:bg-warning-muted focus-visible:ring-warning/50 active:bg-warning-accented",
      },
    },
    {
      variant: "ghost",
      color: "error",
      class: {
        base: "text-error-emphasis hover:bg-error-muted focus-visible:ring-error/50 active:bg-error-accented",
      },
    },
  ],
  compoundSlots: [
    { size: "xs", slots: ["leading", "trailing"], class: "size-3" },
    { size: "sm", slots: ["leading", "trailing"], class: "size-3.5" },
    { size: "md", slots: ["leading", "trailing"], class: "size-4" },
    { size: "lg", slots: ["leading", "trailing"], class: "size-4" },
    { size: "xl", slots: ["leading", "trailing"], class: "size-5" },
  ],
  defaultVariants: {
    variant: "solid",
    size: "md",
    color: "primary",
  },
});

export type ButtonVariants = VariantProps<typeof button>;
export type ButtonSlots = keyof ReturnType<typeof button>;

export type ButtonUI = TVSlot<ButtonSlots>;

export type ButtonTheme = ThemeOverride<ButtonSlots, ButtonVariants>;

/**
 * Everything a Button accepts that is not framework-specific. `F` is however the
 * framework spells an icon: a `ReactNode` in React, a `Component` in Vue.
 *
 * The variant props are written out rather than derived from the recipe because
 * `@vue/compiler-sfc` resolves `defineProps` types from source alone: it cannot
 * evaluate the recipe's inferred type, so neither `VariantProps<typeof button>`
 * nor a mapped type over `button.variants` reaches Vue as finite keys.
 * `ButtonVariantsAreExposed` below closes the gap that leaves.
 */
export interface ButtonProps<F> {
  ui?: ButtonUI;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  color?: ButtonVariants["color"];
  disabled?: boolean;
  loading?: boolean;
  loadingIcon?: F;
  leading?: boolean;
  trailing?: boolean;
  leadingIcon?: F;
  trailingIcon?: F;
}

/**
 * Compile-time guard: adding a variant to the recipe without adding the matching
 * prop above is a type error here rather than a prop that silently does nothing.
 */
export type ButtonVariantsAreExposed = MustBeNever<
  Exclude<keyof ButtonVariants, keyof ButtonProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    button: ComponentContract<ButtonSlots, ButtonVariants>;
  }
}

/**
 * Decide whether Button's optional `leading` and `trailing` slots render.
 *
 * Both are wrappers with nothing of their own to show, and both are sized by the
 * recipe -- `size-4` at `md`, plus the `gap` `base` sets between children. Rendering
 * one that stays empty therefore costs real width, so a slot renders only when
 * something will fill it, or when the caller asked for the space on purpose.
 *
 * Three things fill the leading slot: the caller reserved it with `leading`, the
 * caller supplied leading content, or the button is loading -- the spinner is drawn
 * in the leading slot, so `loading` implies it. Trailing has no such third case,
 * which is the whole of the asymmetry below.
 *
 * `hasLeading` and `hasTrailing` are each framework's answer to "is there content for
 * this slot": a non-null icon prop in React, an icon prop or a filled `<slot>` in Vue.
 * The frameworks answer that question differently but apply the same rule to the
 * answer, so the rule lives here instead of twice in the adapters.
 */
export function showButtonSlots(props: {
  loading?: boolean;
  leading?: boolean;
  trailing?: boolean;
  hasLeading?: boolean;
  hasTrailing?: boolean;
}): { leading: boolean; trailing: boolean } {
  return {
    leading: Boolean(props.loading || props.leading || props.hasLeading),
    trailing: Boolean(props.trailing || props.hasTrailing),
  };
}
