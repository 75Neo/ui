import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Switch: a track the thumb slides along, and the text beside it.
 *
 * @remarks
 * Checked is not a variant, for the same reason it is not one on the Checkbox. Ark
 * writes `data-state` on the control and on the thumb, so one resolved class string
 * covers both states and the component never re-resolves when it is flipped.
 *
 * That is also what lets the two icons be chosen in CSS rather than in the adapter. The
 * thumb opens a group, and `checkedIcon` and `uncheckedIcon` show and hide off its
 * state. An adapter that picked between them itself would have to know the checked
 * state, which for an uncontrolled switch it does not.
 *
 * The thumb travels the track's inner width less its own width, so every size is the
 * same three numbers: the track is the thumb plus the padding on both sides, and the
 * distance is what is left. The `rtl:` twin is not decoration — the whole library is
 * written in logical properties, and `translate-x` is the one axis Tailwind has no
 * logical spelling for.
 *
 * `container` gives the control a box of the label's own line height, so it lines up
 * with the first line of a label rather than with the top of a two-line block.
 *
 * Disabled is styled off `data-disabled` rather than `disabled:`, because Ark renders
 * the root as a `label` and the control as a `span`. Only the hidden input is a real
 * form control, and nothing here styles it.
 *
 * The recipe leaves this module under the registry key's own spelling, `switch`, which
 * a `const` cannot be called. Everything that reads a recipe reads it by its key —
 * `resolveTheme`, the theme registry, the docs — so the export name has to be the key
 * even though the binding inside the file cannot be.
 */
const switchRecipe = tv({
  slots: {
    base: "inline-flex cursor-pointer items-start data-disabled:cursor-not-allowed data-disabled:opacity-75",
    container: "flex shrink-0 items-center",
    control:
      "inline-flex shrink-0 items-center rounded-full bg-accented p-0.5 ring ring-transparent transition-colors ring-inset data-focus-visible:outline-3 data-invalid:ring-error hover:data-[state=unchecked]:bg-accented/75",
    thumb:
      "group/thumb pointer-events-none flex items-center justify-center rounded-full bg-default text-default shadow-sm transition-transform",
    checkedIcon: "hidden shrink-0 group-data-[state=checked]/thumb:block [&>svg]:size-full",
    uncheckedIcon: "block shrink-0 group-data-[state=checked]/thumb:hidden [&>svg]:size-full",
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
        control: "h-3 w-5",
        thumb: "size-2 data-[state=checked]:translate-x-2 rtl:data-[state=checked]:-translate-x-2",
        checkedIcon: "size-1.5",
        uncheckedIcon: "size-1.5",
        label: "text-xs/4",
        description: "text-xs/4",
      },
      sm: {
        base: "gap-2",
        container: "h-4",
        control: "h-3.5 w-6",
        thumb:
          "size-2.5 data-[state=checked]:translate-x-2.5 rtl:data-[state=checked]:-translate-x-2.5",
        checkedIcon: "size-2",
        uncheckedIcon: "size-2",
        label: "text-xs/4",
        description: "text-xs/4",
      },
      md: {
        base: "gap-2",
        container: "h-5",
        control: "h-4 w-7",
        thumb: "size-3 data-[state=checked]:translate-x-3 rtl:data-[state=checked]:-translate-x-3",
        checkedIcon: "size-2",
        uncheckedIcon: "size-2",
        label: "text-sm/5",
        description: "text-sm/5",
      },
      lg: {
        base: "gap-2.5",
        container: "h-5",
        control: "h-4.5 w-8",
        thumb:
          "size-3.5 data-[state=checked]:translate-x-3.5 rtl:data-[state=checked]:-translate-x-3.5",
        checkedIcon: "size-2.5",
        uncheckedIcon: "size-2.5",
        label: "text-sm/5",
        description: "text-sm/5",
      },
      xl: {
        base: "gap-2.5",
        container: "h-6",
        control: "h-5 w-9",
        thumb: "size-4 data-[state=checked]:translate-x-4 rtl:data-[state=checked]:-translate-x-4",
        checkedIcon: "size-3",
        uncheckedIcon: "size-3",
        label: "text-base/6",
        description: "text-base/6",
      },
    },
    /**
     * Spins whichever icon slot the thumb is showing, which is the Button's arrangement
     * and for the same reason: the adapter puts the spinner in both slots and the
     * recipe decides which one the reader ever sees.
     */
    loading: {
      true: { checkedIcon: "animate-spin", uncheckedIcon: "animate-spin" },
      false: {},
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        control: `outline-${color}/25 data-[state=checked]:bg-${color} hover:data-[state=checked]:bg-${color}/75`,
      },
    })),
    {
      color: "neutral",
      class: {
        control:
          "outline-inverted/25 data-[state=checked]:bg-inverted hover:data-[state=checked]:bg-inverted/90",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    loading: false,
  },
});

export { switchRecipe as switch };

export type SwitchVariants = VariantProps<typeof switchRecipe>;
export type SwitchSlots = keyof ReturnType<typeof switchRecipe>;

export type SwitchUI = TVSlot<SwitchSlots>;

export type SwitchTheme = ThemeOverride<SwitchSlots, SwitchVariants>;

/**
 * Everything a Switch accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The checked state is not here: React spells it `checked` with `onCheckedChange`, Vue
 * spells it `v-model:checked`, so each adapter takes it from Ark's root instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface SwitchProps<F> {
  /** Per-slot class overrides. */
  ui?: SwitchUI;
  color?: SwitchVariants["color"];
  size?: SwitchVariants["size"];
  /** Text beside the track. Clicking it flips the switch. */
  label?: string;
  /** A quieter second line under the label. */
  description?: string;
  /** Rides the thumb while the switch is on. */
  checkedIcon?: F;
  /** Rides the thumb while the switch is off. */
  uncheckedIcon?: F;
  /** Spins the thumb's icon, and stops the switch responding. */
  loading?: boolean;
  /** Replaces the default spinner. */
  loadingIcon?: F;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the switch under this name inside a form. */
  name?: string;
  /** The value submitted when on. @defaultValue `"on"` */
  value?: string;
  /** Id of the form to submit with, for a switch rendered outside it. */
  form?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type SwitchVariantsAreExposed = MustBeNever<
  Exclude<keyof SwitchVariants, keyof SwitchProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    switch: ComponentContract<SwitchSlots, SwitchVariants>;
  }
}
