import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the PasswordInput: a field holding a secret, and the button that shows it.
 *
 * @remarks
 * The NumberInput's shape with one button instead of two. The control is one box
 * holding the field, an optional leading icon and the visibility trigger at the
 * trailing edge, so the ring is drawn with `focus-within` on the box around them —
 * the same reason the Combobox and the NumberInput draw theirs that way.
 *
 * The eye is Ark's `Indicator` part, which shows its children while the secret is
 * visible and its `fallback` while it is hidden, so the adapter hands over both
 * icons and never has to know which state the field is in. The trigger carries
 * `data-state` either way, and wears the resting colour only while the secret is
 * showing.
 *
 * The trigger is a real button carrying both the `disabled` attribute and
 * `data-disabled`; the attribute is what is styled. The control carries
 * `data-invalid` rather than the input, so the ring turns red around the whole box
 * including the button.
 */
export const passwordInput = tv({
  slots: {
    base: "flex w-full min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    control:
      "flex w-full min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    input:
      "min-w-0 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
    visibilityTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed disabled:opacity-50 data-[state=visible]:text-default [&>svg]:size-full",
    indicator: "inline-flex items-center justify-center [&>svg]:size-full",
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
        label: "text-xs",
        control: "h-7 gap-1 rounded-md ps-2.5 pe-1.5",
        leadingIcon: "size-3.5",
        input: "text-xs",
        visibilityTrigger: "size-4",
        indicator: "size-4",
      },
      md: {
        label: "text-sm",
        control: "h-9 gap-1.5 rounded-md ps-3 pe-2",
        leadingIcon: "size-4",
        input: "text-sm",
        visibilityTrigger: "size-4",
        indicator: "size-4",
      },
      lg: {
        label: "text-sm",
        control: "h-10 gap-2 rounded-md ps-3.5 pe-2.5",
        leadingIcon: "size-5",
        input: "text-sm",
        visibilityTrigger: "size-5",
        indicator: "size-5",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { control: `focus-within:ring-2 focus-within:ring-${color}` },
    })),
    {
      color: "neutral",
      class: { control: "focus-within:ring-2 focus-within:ring-inverted" },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type PasswordInputVariants = VariantProps<typeof passwordInput>;
export type PasswordInputSlots = keyof ReturnType<typeof passwordInput>;

export type PasswordInputUI = TVSlot<PasswordInputSlots>;

export type PasswordInputTheme = ThemeOverride<PasswordInputSlots, PasswordInputVariants>;

/** What the browser may offer to fill the field with. Written out rather than imported. */
export type PasswordInputAutoComplete = "current-password" | "new-password";

/**
 * Everything a PasswordInput accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * There is no value prop, in either framework, because Ark's root takes none: the
 * field is uncontrolled and submits under `name`. Whether the secret is showing is
 * the only state either adapter owns — React spells it `visible` with
 * `onVisibilityChange`, Vue spells it `v-model:visible`.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface PasswordInputProps<F> {
  /** Per-slot class overrides. */
  ui?: PasswordInputUI;
  color?: PasswordInputVariants["color"];
  size?: PasswordInputVariants["size"];
  /** Caption above the control. */
  label?: string;
  /** Shown while the field is empty. */
  placeholder?: string;
  /** What the browser may offer to fill the field with. @defaultValue `"current-password"` */
  autoComplete?: PasswordInputAutoComplete;
  /** Submits the secret under this name inside a form. */
  name?: string;
  /** Keep password managers from touching the field. */
  ignorePasswordManagers?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Icon shown before the field, usually a lock. */
  leadingIcon?: F;
  /** Shown on the trigger while the secret is visible. */
  visibleIcon?: F;
  /** Shown on the trigger while the secret is hidden. */
  hiddenIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type PasswordInputVariantsAreExposed = MustBeNever<
  Exclude<keyof PasswordInputVariants, keyof PasswordInputProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    passwordInput: ComponentContract<PasswordInputSlots, PasswordInputVariants>;
  }
}
