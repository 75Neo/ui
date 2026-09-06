import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Combobox styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The list has no group parts. Grouping needs a second level of items, its own label
 * and its own key, and a flat list keeps the item prop a single array a caller can
 * build from anything.
 *
 * Focus lives on the control, not the input. The input, the chevron and the clear
 * button ride one box: the ring is drawn with `focus-within` on the box around the
 * input, where a Select — one button — draws it on the button itself.
 */

export type ComboboxColor = ComponentColor;
export type ComboboxSize = "sm" | "md" | "lg";

export const comboboxDefaults = { color: "primary", size: "md" } as const;

export const comboboxSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const comboboxParts = [
  { export: "Combobox", file: "combobox", contract: "ComboboxRootProps" },
  { export: "ComboboxLabel", file: "label", contract: null },
  { export: "ComboboxControl", file: "control", contract: null },
  { export: "ComboboxInput", file: "input", contract: null },
  { export: "ComboboxTrigger", file: "trigger", contract: null },
  { export: "ComboboxClearTrigger", file: "clear-trigger", contract: null },
  { export: "ComboboxContent", file: "content", contract: null },
  { export: "ComboboxList", file: "list", contract: null },
  { export: "ComboboxEmpty", file: "empty", contract: null },
  { export: "ComboboxItem", file: "item", contract: "ComboboxItemProps" },
  { export: "ComboboxItemText", file: "item-text", contract: null },
  { export: "ComboboxItemIndicator", file: "item-indicator", contract: null },
] as const satisfies readonly ComponentPart[];

export const comboboxSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  control: {
    sm: "h-7 gap-1 rounded-md ps-2.5 pe-1.5",
    md: "h-9 gap-1.5 rounded-md ps-3 pe-2",
    lg: "h-10 gap-2 rounded-md ps-3.5 pe-2.5",
  },
  input: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  trigger: {
    sm: "size-4",
    md: "size-4",
    lg: "size-5",
  },
  clearTrigger: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-4",
  },
  content: {
    sm: "p-1",
    md: "p-1",
    lg: "p-1.5",
  },
  item: {
    sm: "gap-1.5 px-2 py-1 text-xs",
    md: "gap-2 px-2.5 py-1.5 text-sm",
    lg: "gap-2 px-3 py-2 text-sm",
  },
  leadingIcon: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  itemIndicator: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  empty: {
    sm: "px-2 py-4 text-xs",
    md: "px-2.5 py-5 text-sm",
    lg: "px-3 py-6 text-sm",
  },
} as const satisfies Record<string, Record<ComboboxSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface ComboboxControlCompound {
  color?: ComboboxColor;
  class: string;
}

export const comboboxControlCompoundData: ComboboxControlCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-within:ring-2 focus-within:ring-${color}`,
  })),
  { color: "neutral", class: "focus-within:ring-2 focus-within:ring-inverted" },
];

/** One colour row, as `cva` compound variants read it. */
export interface ComboboxItemCompound {
  color?: ComboboxColor;
  class: string;
}

export const comboboxItemCompoundData: ComboboxItemCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `data-highlighted:bg-${color}/10 data-highlighted:text-${color} data-[state=checked]:text-${color}`,
  })),
  {
    color: "neutral",
    class:
      "data-highlighted:bg-elevated data-highlighted:text-highlighted data-[state=checked]:text-highlighted",
  },
];

/**
 * One option in the list.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * `label` is what the reader sees, what the field shows once the option is picked,
 * and what the filter matches on. `value` is what the form submits. Its own type,
 * deliberately not shared: the three list components are independent contracts.
 */
export interface ComboboxOption<F> {
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
export function filterComboboxItems<F>(
  items: ComboboxOption<F>[],
  query: string,
): ComboboxOption<F>[] {
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
 * Everything a Combobox accepts in both frameworks. Each adapter adds its own
 * framework props on top.
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
 * Either `items` or a caller-built `collection` feeds the list. `items` builds the
 * collection inside and renders the default rows; `collection` hands the rows to the
 * caller to compose. One or the other, never neither.
 */
export interface ComboboxRootProps<F> {
  color?: ComboboxColor;
  size?: ComboboxSize;
  /** The options to offer, before filtering. */
  items?: ComboboxOption<F>[];
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
  /** Replaces the chevron beside the field. */
  trailingIcon?: F;
  /** Replaces the cross that empties the field. */
  clearIcon?: F;
  /** Replaces the tick beside a chosen option. */
  selectedIcon?: F;
}

/**
 * What a Combobox row is made of, for custom composition.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface ComboboxItemProps<F> {
  /** The option this row draws. */
  item: ComboboxOption<F>;
  /** Replaces this row's icon. Falls back to the option's own. */
  leadingIcon?: F;
  /** Replaces the tick beside a chosen option. Falls back to the root's. */
  selectedIcon?: F;
}
