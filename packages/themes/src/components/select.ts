import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Select styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The control is a positioning context, the trigger fills it, and the `indicators`
 * span floats the clear button and the chevron over its trailing edge — because the
 * trigger is a `button`, and a button inside a button is not markup a browser will
 * keep. That span is `pointer-events-none`, so a click between the two icons still
 * opens the list, and the clear button turns them back on for itself.
 *
 * Ark spells this component's states three ways. The trigger and the clear button
 * are real buttons and carry `disabled`. A trigger with nothing chosen carries
 * `data-placeholder-shown`. An item under the pointer or the arrow keys carries
 * `data-highlighted`, and a chosen one carries `data-state="checked"` — the same
 * word the Checkbox styles itself with.
 */

export type SelectColor = ComponentColor;
export type SelectSize = "sm" | "md" | "lg";

export const selectDefaults = { color: "primary", size: "md" } as const;

export const selectSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const selectParts = [
  { export: "Select", file: "select", contract: "SelectRootProps" },
  { export: "SelectLabel", file: "label", contract: null },
  { export: "SelectControl", file: "control", contract: null },
  { export: "SelectTrigger", file: "trigger", contract: null },
  { export: "SelectValueText", file: "value-text", contract: null },
  { export: "SelectClearTrigger", file: "clear-trigger", contract: null },
  { export: "SelectIndicator", file: "indicator", contract: "SelectIndicatorProps" },
  { export: "SelectContent", file: "content", contract: null },
  { export: "SelectList", file: "list", contract: null },
  { export: "SelectItemGroup", file: "item-group", contract: null },
  { export: "SelectItemGroupLabel", file: "item-group-label", contract: null },
  { export: "SelectItem", file: "item", contract: "SelectItemProps" },
  { export: "SelectItemText", file: "item-text", contract: null },
  { export: "SelectItemIndicator", file: "item-indicator", contract: null },
] as const satisfies readonly ComponentPart[];

export const selectSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  trigger: {
    sm: "h-7 gap-1 rounded-md ps-2.5 pe-8 text-xs",
    md: "h-9 gap-1.5 rounded-md ps-3 pe-9 text-sm",
    lg: "h-10 gap-2 rounded-md ps-3.5 pe-11 text-sm",
  },
  indicators: {
    sm: "gap-1 pe-1.5",
    md: "gap-1.5 pe-2",
    lg: "gap-2 pe-2.5",
  },
  clearTrigger: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-4",
  },
  indicator: {
    sm: "size-4",
    md: "size-4",
    lg: "size-5",
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
} as const satisfies Record<string, Record<SelectSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface SelectTriggerCompound {
  color?: SelectColor;
  class: string;
}

export const selectTriggerCompoundData: SelectTriggerCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-visible:ring-2 focus-visible:ring-${color}`,
  })),
  { color: "neutral", class: "focus-visible:ring-2 focus-visible:ring-inverted" },
];

/** One colour row, as `cva` compound variants read it. */
export interface SelectItemCompound {
  color?: SelectColor;
  class: string;
}

export const selectItemCompoundData: SelectItemCompound[] = [
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
 * `label` is what the reader sees, in the list and in the trigger once the option
 * is chosen. `value` is what the form submits. Its own type, deliberately not
 * shared with the Combobox or the Listbox: a Select whose item type moved because
 * another component needed a field would be the wrong kind of coupling.
 */
export interface SelectOption<F> {
  /** Submitted, and used to identify the option. */
  value: string;
  /** Shown in the list, and in the trigger once the option is chosen. */
  label: string;
  disabled?: boolean;
  /** Icon shown before this option's label. */
  icon?: F;
}

/**
 * Everything a Select accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The selection is not here: React spells it `value` with `onValueChange`, Vue
 * spells it `v-model`, so each adapter takes it from Ark's root instead. It is a
 * `string[]` in both, one entry long unless `multiple` is set, because Ark's
 * collection is keyed by value and a single-selection API would be a second shape
 * to convert on every change.
 *
 * Either `items` or a caller-built `collection` feeds the list. `items` builds the
 * collection inside and renders the default rows; `collection` hands the rows to
 * the caller to compose. One or the other, never neither.
 */
export interface SelectRootProps<F> {
  color?: SelectColor;
  size?: SelectSize;
  /** The options to offer. Builds the collection and the default rows. */
  items?: SelectOption<F>[];
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

/**
 * What a Select row is made of, for custom composition.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface SelectItemProps<F> {
  /** The option this row draws. */
  item: SelectOption<F>;
  /** Replaces this row's icon. Falls back to the option's own. */
  leadingIcon?: F;
  /** Replaces the tick beside a chosen option. Falls back to the root's. */
  selectedIcon?: F;
}

/**
 * The chevron beside the answer.
 *
 * @remarks
 * A part prop, not a root one: it is consumed by exactly one part. An arbitrary
 * glyph — a caret, a pair of arrows, a plus — does not always read as something
 * that should turn over, so the spin stays switchable where the icon lives.
 */
export interface SelectIndicatorProps {
  /** Turn the chevron over while the list is open. @defaultValue `true` */
  spin?: boolean;
}
