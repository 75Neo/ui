import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Listbox styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The frame is what differs from the Select and the Combobox: there is no trigger
 * and no portal, so `content` is an inline list and the colour half lands on the
 * rows alone. An item is a `div` carrying `data-selected` while it is chosen —
 * the same word as `checked` nowhere else, because a listbox was here first.
 */

export type ListboxColor = ComponentColor;
export type ListboxSize = "sm" | "md" | "lg";

/** How many options the list collects. Written out rather than imported from Ark. */
export type ListboxSelectionMode = "single" | "multiple" | "extended";

export const listboxDefaults = { color: "primary", size: "md" } as const;

export const listboxSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const listboxParts = [
  { export: "Listbox", file: "listbox", contract: "ListboxRootProps" },
  { export: "ListboxLabel", file: "label", contract: null },
  { export: "ListboxContent", file: "content", contract: null },
  { export: "ListboxEmpty", file: "empty", contract: null },
  { export: "ListboxItem", file: "item", contract: "ListboxItemProps" },
  { export: "ListboxItemText", file: "item-text", contract: null },
  { export: "ListboxItemIndicator", file: "item-indicator", contract: null },
] as const satisfies readonly ComponentPart[];

export const listboxSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  content: {
    sm: "p-1",
    md: "p-1",
    lg: "p-1.5",
  },
  empty: {
    sm: "px-2 py-4 text-xs",
    md: "px-2.5 py-5 text-sm",
    lg: "px-3 py-6 text-sm",
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
} as const satisfies Record<string, Record<ListboxSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface ListboxItemCompound {
  color?: ListboxColor;
  class: string;
}

export const listboxItemCompoundData: ListboxItemCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `data-highlighted:bg-${color}/10 data-highlighted:text-${color} data-selected:text-${color}`,
  })),
  {
    color: "neutral",
    class:
      "data-highlighted:bg-elevated data-highlighted:text-highlighted data-selected:text-highlighted",
  },
];

/**
 * One option in the list.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * Its own type, deliberately not shared: the three list components are independent
 * contracts, and a Listbox whose item type moved because another component needed a
 * field would be the wrong kind of coupling.
 */
export interface ListboxOption<F> {
  /** Used to identify the option. */
  value: string;
  /** Shown in the list. */
  label: string;
  disabled?: boolean;
  /** Icon shown before this option's label. */
  icon?: F;
}

/**
 * Everything a Listbox accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The selection is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead. It is a `string[]`
 * in both, one entry long unless the selection mode collects more, because Ark's
 * collection is keyed by value and a single-selection API would be a second shape to
 * convert on every change.
 *
 * Either `items` or a caller-built `collection` feeds the list. `items` builds the
 * collection inside and renders the default rows; `collection` hands the rows to the
 * caller to compose. One or the other, never neither.
 */
export interface ListboxRootProps<F> {
  color?: ListboxColor;
  size?: ListboxSize;
  /** The options to offer. */
  items?: ListboxOption<F>[];
  /** Caption above the list. */
  label?: string;
  /** Shown in place of the rows when there are none. @defaultValue `"No options."` */
  emptyMessage?: string;
  /** How many options the list collects. @defaultValue `"single"` */
  selectionMode?: ListboxSelectionMode;
  /** Let a second click on the chosen option unchoose it. Single selection only. */
  deselectable?: boolean;
  /** Wrap the arrow keys from the last option round to the first. */
  loopFocus?: boolean;
  disabled?: boolean;
  /** Replaces the tick beside a chosen option. */
  selectedIcon?: F;
}

/**
 * What a Listbox row is made of, for custom composition.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface ListboxItemProps<F> {
  /** The option this row draws. */
  item: ListboxOption<F>;
  /** Replaces this row's icon. Falls back to the option's own. */
  leadingIcon?: F;
  /** Replaces the tick beside a chosen option. Falls back to the root's. */
  selectedIcon?: F;
}
