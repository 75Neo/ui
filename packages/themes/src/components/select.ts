import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Select: a button showing the current answer, and the list it opens.
 *
 * @remarks
 * The Combobox is the neighbour to read this against. The two share a size scale, a
 * color half and every name in the popup, because a reader who has learned one should
 * not have to learn the other. What differs is the control: a Combobox is a text field
 * that happens to open a list, so its ring is drawn with `focus-within` on the box
 * around the input; a Select is one button, so the ring is drawn on the button itself
 * with `focus-visible`.
 *
 * The clear button cannot live inside the trigger, because the trigger is a `button`
 * and a button inside a button is not markup a browser will keep. So the control is a
 * positioning context, the trigger fills it, and the `indicators` slot floats the clear
 * button and the chevron over its trailing edge. That slot is `pointer-events-none` so
 * a click between the two icons still opens the list, and the clear button turns them
 * back on for itself.
 *
 * The list has no group parts, for the same reason the Combobox has none: grouping
 * needs a second level of items with its own label and its own key, and a flat list
 * keeps the item prop a single array a caller can build from anything.
 *
 * Ark spells this component's states three ways. The trigger and the clear button are
 * real buttons and carry `disabled`. A trigger with nothing chosen carries
 * `data-placeholder-shown`. An item under the pointer or the arrow keys carries
 * `data-highlighted`, and a chosen one carries `data-state="checked"` — the same word
 * the Checkbox styles itself with.
 */
export const select = tv({
  slots: {
    base: "flex w-full min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    control: "relative flex w-full min-w-0 items-center",
    trigger:
      "flex w-full min-w-0 cursor-pointer items-center bg-default text-start text-highlighted ring ring-accented outline-none ring-inset disabled:cursor-not-allowed disabled:opacity-75 data-invalid:ring-error data-[placeholder-shown]:text-dimmed",
    valueText: "min-w-0 flex-1 truncate",
    indicators: "pointer-events-none absolute inset-e-0 flex items-center",
    clearTrigger:
      "pointer-events-auto inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
    trailingIcon:
      "inline-flex shrink-0 items-center justify-center text-dimmed transition-transform [&>svg]:size-full",
    positioner: "z-50",
    content:
      "flex max-h-60 min-w-(--reference-width) flex-col overflow-hidden rounded-md bg-default shadow-lg ring ring-accented outline-none",
    list: "min-h-0 flex-1 overflow-y-auto overscroll-contain",
    item: "flex cursor-pointer items-center rounded-md text-toned select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    itemText: "min-w-0 flex-1 truncate",
    itemIndicator: "ms-auto shrink-0 [&>svg]:size-full",
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
        trigger: "h-7 gap-1 rounded-md ps-2.5 pe-8 text-xs",
        indicators: "gap-1 pe-1.5",
        clearTrigger: "size-3.5",
        trailingIcon: "size-4",
        content: "p-1",
        item: "gap-1.5 px-2 py-1 text-xs",
        leadingIcon: "size-3.5",
        itemIndicator: "size-3.5",
      },
      md: {
        label: "text-sm",
        trigger: "h-9 gap-1.5 rounded-md ps-3 pe-9 text-sm",
        indicators: "gap-1.5 pe-2",
        clearTrigger: "size-4",
        trailingIcon: "size-4",
        content: "p-1",
        item: "gap-2 px-2.5 py-1.5 text-sm",
        leadingIcon: "size-4",
        itemIndicator: "size-4",
      },
      lg: {
        label: "text-sm",
        trigger: "h-10 gap-2 rounded-md ps-3.5 pe-11 text-sm",
        indicators: "gap-2 pe-2.5",
        clearTrigger: "size-4",
        trailingIcon: "size-5",
        content: "p-1.5",
        item: "gap-2 px-3 py-2 text-sm",
        leadingIcon: "size-5",
        itemIndicator: "size-5",
      },
    },
    /**
     * Turn the chevron over while the list is open.
     *
     * @remarks
     * Ark writes `data-state` onto the indicator itself, so the rotation needs no
     * ancestor to watch. It is a variant rather than a fixed class because the icon is
     * replaceable, and an arbitrary one — a caret, a pair of arrows, a plus — does not
     * always read as something that should turn over.
     */
    spin: {
      true: { trailingIcon: "data-[state=open]:rotate-180" },
      false: "",
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        trigger: `focus-visible:ring-2 focus-visible:ring-${color}`,
        item: `data-highlighted:bg-${color}/10 data-highlighted:text-${color} data-[state=checked]:text-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        trigger: "focus-visible:ring-2 focus-visible:ring-inverted",
        item: "data-highlighted:bg-elevated data-highlighted:text-highlighted data-[state=checked]:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    spin: true,
  },
});

export type SelectVariants = VariantProps<typeof select>;
export type SelectSlots = keyof ReturnType<typeof select>;

export type SelectUI = TVSlot<SelectSlots>;

export type SelectTheme = ThemeOverride<SelectSlots, SelectVariants>;

/**
 * One option in the list.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * `label` is what the reader sees, in the list and in the closed trigger. `value` is
 * what the form submits. They are the same shape the Combobox reads, and deliberately
 * not the same type: the two components are independent contracts, and a Select whose
 * item type moved because a Combobox needed a filter field would be the wrong kind of
 * coupling.
 */
export interface SelectItem<F> {
  /** Submitted, and used to identify the option. */
  value: string;
  /** Shown in the list, and in the trigger once the option is chosen. */
  label: string;
  disabled?: boolean;
  /** Icon shown before this option's label. */
  icon?: F;
}

/**
 * Everything a Select accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The selection is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead. It is a `string[]` in
 * both, one entry long unless `multiple` is set, because Ark's collection is keyed by
 * value and a single-selection API would be a second shape to convert on every change.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface SelectProps<F> {
  /** Per-slot class overrides. */
  ui?: SelectUI;
  color?: SelectVariants["color"];
  size?: SelectVariants["size"];
  /** Turn the chevron over while the list is open. @defaultValue `true` */
  spin?: SelectVariants["spin"];
  /** The options to offer. */
  items: SelectItem<F>[];
  /** Caption above the control. */
  label?: string;
  /** Shown in the trigger while nothing is chosen. */
  placeholder?: string;
  /** Allow more than one option to be chosen. */
  multiple?: boolean;
  /** Show the button that empties the control. @defaultValue `true` */
  clearable?: boolean;
  /** Let a second click on the chosen option unchoose it. Single selection only. */
  deselectable?: boolean;
  /** Wrap the arrow keys from the last option round to the first. */
  loopFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the selection under this name inside a form. */
  name?: string;
  /** Replaces the chevron beside the answer. */
  trailingIcon?: F;
  /** Replaces the cross that empties the control. */
  clearIcon?: F;
  /** Replaces the tick beside a chosen option. */
  selectedIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type SelectVariantsAreExposed = MustBeNever<
  Exclude<keyof SelectVariants, keyof SelectProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    select: ComponentContract<SelectSlots, SelectVariants>;
  }
}
