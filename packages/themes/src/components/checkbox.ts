import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Checkbox: a box that takes the tick, and the text beside it.
 *
 * @remarks
 * Checked is not a variant. Ark writes `data-state` on the control — `checked`,
 * `unchecked` or `indeterminate` — and the recipe styles itself off that attribute, so
 * one resolved class string covers all three states and the component never re-resolves
 * when it is toggled. Indeterminate looks exactly like checked, because it is a filled
 * box either way and only the glyph inside differs.
 *
 * `container` exists so the box lines up with the first line of the label rather than
 * with the top of it. It is a box of the label's own line height with the control
 * centred in it, which keeps the alignment right when a description pushes the text
 * block taller than the control.
 *
 * Hover is asymmetric on purpose. An unchecked box darkens its ring, since there is no
 * fill to darken; a checked one drops its fill to `/75`, the strength the color
 * vocabulary reserves for exactly that.
 *
 * Disabled is styled off `data-disabled` rather than `disabled:`, because Ark renders
 * the root as a `label` and the control as a `div`. Only the hidden input is a real
 * form control, and nothing here styles it.
 */
export const checkbox = tv({
  slots: {
    base: "group/checkbox inline-flex cursor-pointer items-start data-disabled:cursor-not-allowed data-disabled:opacity-75",
    container: "flex shrink-0 items-center",
    control:
      "inline-flex shrink-0 items-center justify-center rounded-sm bg-default text-inverted ring ring-accented transition-colors ring-inset data-focus-visible:outline-3 data-invalid:ring-error hover:data-[state=unchecked]:ring-inverted/50",
    indicator: "flex items-center justify-center [&>svg]:size-full",
    wrapper: "min-w-0 flex-1",
    label: "block font-medium text-highlighted select-none",
    description: "mt-1 text-pretty text-muted",
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
      xs: {
        base: "gap-1.5",
        container: "h-4",
        control: "size-3",
        indicator: "size-2",
        label: "text-xs/4",
        description: "text-xs/4",
      },
      sm: {
        base: "gap-2",
        container: "h-4",
        control: "size-3.5",
        indicator: "size-2.5",
        label: "text-xs/4",
        description: "text-xs/4",
      },
      md: {
        base: "gap-2",
        container: "h-5",
        control: "size-4",
        indicator: "size-3",
        label: "text-sm/5",
        description: "text-sm/5",
      },
      lg: {
        base: "gap-2.5",
        container: "h-5",
        control: "size-4.5",
        indicator: "size-3.5",
        label: "text-sm/5",
        description: "text-sm/5",
      },
      xl: {
        base: "gap-2.5",
        container: "h-6",
        control: "size-5",
        indicator: "size-4",
        label: "text-base/6",
        description: "text-base/6",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        control: `outline-${color}/25 data-[state=checked]:bg-${color} data-[state=checked]:ring-${color} hover:data-[state=checked]:bg-${color}/75 data-[state=indeterminate]:bg-${color} data-[state=indeterminate]:ring-${color} hover:data-[state=indeterminate]:bg-${color}/75`,
      },
    })),
    {
      color: "neutral",
      class: {
        control:
          "outline-inverted/25 data-[state=checked]:bg-inverted data-[state=checked]:ring-inverted hover:data-[state=checked]:bg-inverted/90 data-[state=indeterminate]:bg-inverted data-[state=indeterminate]:ring-inverted hover:data-[state=indeterminate]:bg-inverted/90",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type CheckboxVariants = VariantProps<typeof checkbox>;
export type CheckboxSlots = keyof ReturnType<typeof checkbox>;

export type CheckboxUI = TVSlot<CheckboxSlots>;

export type CheckboxTheme = ThemeOverride<CheckboxSlots, CheckboxVariants>;

/**
 * Everything a Checkbox accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The checked state is not here: React spells it `checked` with `onCheckedChange`, Vue
 * spells it `v-model:checked`, so each adapter takes it from Ark's root instead. Both
 * accept `"indeterminate"` alongside `true` and `false`.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface CheckboxProps<F> {
  /** Per-slot class overrides. */
  ui?: CheckboxUI;
  color?: CheckboxVariants["color"];
  size?: CheckboxVariants["size"];
  /** Text beside the box. Clicking it toggles the checkbox. */
  label?: string;
  /** A quieter second line under the label. */
  description?: string;
  /** Replaces the tick shown while checked. */
  icon?: F;
  /** Replaces the dash shown while indeterminate. */
  indeterminateIcon?: F;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the checkbox under this name inside a form. */
  name?: string;
  /** The value submitted when checked. @defaultValue `"on"` */
  value?: string;
  /** Id of the form to submit with, for a checkbox rendered outside it. */
  form?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type CheckboxVariantsAreExposed = MustBeNever<
  Exclude<keyof CheckboxVariants, keyof CheckboxProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    checkbox: ComponentContract<CheckboxSlots, CheckboxVariants>;
  }
}
