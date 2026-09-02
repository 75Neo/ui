import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Combobox: a text field that filters a list, and the popup it opens.
 *
 * @remarks
 * The list is portalled to the document body, because a combobox is dropped into cards,
 * dialogs and toolbars and any one of them may clip its overflow. Both adapters delay
 * the move until mount, so the server pass and the first client render are identical
 * and hydration has nothing to reconcile. The `positioner` slot carries the stacking
 * context that goes with living at the end of the document.
 *
 * The list has no group parts. Grouping needs a second level of items, its own label
 * and its own key, and nothing in the library asks for one yet; a flat list keeps the
 * item prop a single array that a caller can build from anything.
 *
 * Focus lives on the control, not the input. The input, the chevron and the clear
 * button are three focusable things inside one box that has to read as a single field,
 * so the ring is drawn with `focus-within` on the box around them.
 *
 * Ark spells this component's states three ways, and each is styled where it is
 * written. The trigger and the clear button are real buttons and carry `disabled`. An
 * item under the pointer or the arrow keys carries `data-highlighted`, and a selected
 * one carries `data-state="checked"` — the same word the Checkbox styles itself with.
 */
export const combobox = tv({
  slots: {
    base: "flex w-full min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    control:
      "flex w-full min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
    input:
      "min-w-0 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
    trigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-transform outline-none hover:text-default disabled:cursor-not-allowed data-[state=open]:rotate-180 [&>svg]:size-full",
    clearTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
    positioner: "z-50",
    content:
      "flex max-h-60 min-w-(--reference-width) flex-col overflow-hidden rounded-md bg-default shadow-lg ring ring-accented outline-none",
    list: "min-h-0 flex-1 overflow-y-auto overscroll-contain",
    item: "flex cursor-pointer items-center rounded-md text-toned select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    itemText: "min-w-0 flex-1 truncate",
    itemIndicator: "ms-auto shrink-0 [&>svg]:size-full",
    empty: "text-center text-muted",
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
        input: "text-xs",
        trigger: "size-4",
        clearTrigger: "size-3.5",
        content: "p-1",
        item: "gap-1.5 px-2 py-1 text-xs",
        leadingIcon: "size-3.5",
        itemIndicator: "size-3.5",
        empty: "px-2 py-4 text-xs",
      },
      md: {
        label: "text-sm",
        control: "h-9 gap-1.5 rounded-md ps-3 pe-2",
        input: "text-sm",
        trigger: "size-4",
        clearTrigger: "size-4",
        content: "p-1",
        item: "gap-2 px-2.5 py-1.5 text-sm",
        leadingIcon: "size-4",
        itemIndicator: "size-4",
        empty: "px-2.5 py-5 text-sm",
      },
      lg: {
        label: "text-sm",
        control: "h-10 gap-2 rounded-md ps-3.5 pe-2.5",
        input: "text-sm",
        trigger: "size-5",
        clearTrigger: "size-4",
        content: "p-1.5",
        item: "gap-2 px-3 py-2 text-sm",
        leadingIcon: "size-5",
        itemIndicator: "size-5",
        empty: "px-3 py-6 text-sm",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        control: `focus-within:ring-2 focus-within:ring-${color}`,
        item: `data-highlighted:bg-${color}/10 data-highlighted:text-${color} data-[state=checked]:text-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        control: "focus-within:ring-2 focus-within:ring-inverted",
        item: "data-highlighted:bg-elevated data-highlighted:text-highlighted data-[state=checked]:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type ComboboxVariants = VariantProps<typeof combobox>;
export type ComboboxSlots = keyof ReturnType<typeof combobox>;

export type ComboboxUI = TVSlot<ComboboxSlots>;

export type ComboboxTheme = ThemeOverride<ComboboxSlots, ComboboxVariants>;

/**
 * One option in the list.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * `label` is what the reader sees, what the field shows once the option is picked, and
 * what the filter matches on. `value` is what the form submits. Keeping them apart is
 * the whole reason a combobox is not a text input.
 */
export interface ComboboxItem<F> {
  /** Submitted, and used to identify the option. */
  value: string;
  /** Shown in the list and in the field, and matched by the filter. */
  label: string;
  disabled?: boolean;
  /** Icon shown before this option's label. */
  icon?: F;
}

/**
 * Narrow a list of options to the ones matching what has been typed.
 *
 * @param items - Every option, unfiltered.
 * @param query - The current input text.
 * @returns The options whose label contains the query, or every option when the query
 * is blank.
 *
 * @remarks
 * Lives here rather than in either adapter because both need exactly this rule and a
 * combobox whose React and Vue halves disagreed about what counts as a match would be
 * two components. Case-insensitive and substring rather than prefix, which is what a
 * reader typing "script" to find "TypeScript" expects.
 *
 * Ark ships `useListCollection`, which filters too, but it takes its items once at
 * mount. Filtering here instead means a changed `items` prop reaches the list on the
 * next render in both frameworks, with no effect to synchronize it.
 */
export function filterComboboxItems<F>(items: ComboboxItem<F>[], query: string): ComboboxItem<F>[] {
  const needle = query.trim().toLowerCase();
  if (needle === "") return items;

  return items.filter((item) => item.label.toLowerCase().includes(needle));
}

/**
 * What the list should be filtered by, given the change Ark just reported.
 *
 * @param inputValue - The field's new text.
 * @param reason - Why it changed, as Ark's `InputValueChangeReason`.
 * @returns The query to filter by, which is the text only when a person typed it.
 *
 * @remarks
 * Ark rewrites the field itself when an option is picked or the field is cleared, and
 * treating that rewrite as a query would leave the list showing the one option already
 * chosen. So only typing narrows the list; every other reason widens it back to
 * everything, which is what a reader reopening the list expects to see.
 */
export function comboboxFilterText(inputValue: string, reason: string | undefined): string {
  return reason === "input-change" ? inputValue : "";
}

/**
 * Everything a Combobox accepts in both frameworks. Each adapter adds its own framework
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
 * The text in the field is the component's own business. It filters the list, it is
 * reset when an option is picked, and it is not a prop: a caller who needs to drive the
 * query drives `items` instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface ComboboxProps<F> {
  /** Per-slot class overrides. */
  ui?: ComboboxUI;
  color?: ComboboxVariants["color"];
  size?: ComboboxVariants["size"];
  /** The options to offer, before filtering. */
  items: ComboboxItem<F>[];
  /** Caption above the field. */
  label?: string;
  /** Placeholder for the empty field. */
  placeholder?: string;
  /** Shown in place of the list when nothing matches. @defaultValue `"No results found."` */
  emptyMessage?: string;
  /** Allow more than one option to be selected. */
  multiple?: boolean;
  /** Show the button that empties the field. @defaultValue `true` */
  clearable?: boolean;
  /** Open the list when the field is clicked, rather than only when typing. */
  openOnClick?: boolean;
  /** Accept text that matches no option. */
  allowCustomValue?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the selection under this name inside a form. */
  name?: string;
  /** Replaces the chevron that opens the list. */
  trailingIcon?: F;
  /** Replaces the cross that empties the field. */
  clearIcon?: F;
  /** Replaces the tick beside a selected option. */
  selectedIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ComboboxVariantsAreExposed = MustBeNever<
  Exclude<keyof ComboboxVariants, keyof ComboboxProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    combobox: ComponentContract<ComboboxSlots, ComboboxVariants>;
  }
}
