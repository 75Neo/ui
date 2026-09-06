import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * DatePicker styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type DatePickerColor = ComponentColor;
export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerSelectionMode = "single" | "multiple" | "range";

export const datePickerDefaults = { color: "primary", size: "md" } as const;

export const datePickerSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const datePickerParts = [
  { export: "DatePicker", file: "date-picker", contract: "DatePickerRootProps" },
  { export: "DatePickerLabel", file: "label", contract: null },
  { export: "DatePickerControl", file: "control", contract: null },
  { export: "DatePickerInput", file: "input", contract: null },
  { export: "DatePickerClearTrigger", file: "clear-trigger", contract: null },
  { export: "DatePickerTrigger", file: "trigger", contract: null },
  { export: "DatePickerContent", file: "content", contract: null },
  { export: "DatePickerView", file: "view", contract: null },
  { export: "DatePickerViewControl", file: "view-control", contract: null },
  { export: "DatePickerPrevTrigger", file: "prev-trigger", contract: null },
  { export: "DatePickerViewTrigger", file: "view-trigger", contract: null },
  { export: "DatePickerNextTrigger", file: "next-trigger", contract: null },
  { export: "DatePickerTable", file: "table", contract: null },
  { export: "DatePickerTableHead", file: "table-head", contract: null },
  { export: "DatePickerTableRow", file: "table-row", contract: null },
  { export: "DatePickerTableHeader", file: "table-header", contract: null },
  { export: "DatePickerTableBody", file: "table-body", contract: null },
  { export: "DatePickerTableCell", file: "table-cell", contract: null },
  { export: "DatePickerTableCellTrigger", file: "table-cell-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const datePickerSizeData = {
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
  separator: {
    sm: "px-0.5 text-xs",
    md: "px-1 text-sm",
    lg: "px-1 text-sm",
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
    sm: "w-64 p-2.5",
    md: "w-72 p-3",
    lg: "w-80 p-3.5",
  },
  view: {
    sm: "gap-2",
    md: "gap-2.5",
    lg: "gap-3",
  },
  viewControl: {
    sm: "gap-1",
    md: "gap-1",
    lg: "gap-1.5",
  },
  prevTrigger: {
    sm: "size-6 p-1.5",
    md: "size-7 p-1.5",
    lg: "size-8 p-2",
  },
  viewTrigger: {
    sm: "h-6 px-2 text-xs",
    md: "h-7 px-2.5 text-sm",
    lg: "h-8 px-3 text-sm",
  },
  nextTrigger: {
    sm: "size-6 p-1.5",
    md: "size-7 p-1.5",
    lg: "size-8 p-2",
  },
  tableHeader: {
    sm: "pb-1 text-[0.6875rem]",
    md: "pb-1 text-xs",
    lg: "pb-1.5 text-xs",
  },
  tableCellTrigger: {
    sm: "h-7 text-xs",
    md: "h-8 text-sm",
    lg: "h-9 text-sm",
  },
} as const satisfies Record<string, Record<DatePickerSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface DatePickerControlCompound {
  color?: DatePickerColor;
  class: string;
}

export const datePickerControlCompoundData: DatePickerControlCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-within:ring-2 focus-within:ring-${color}`,
  })),
  { color: "neutral", class: "focus-within:ring-2 focus-within:ring-inverted" },
];

/** One colour row, as `cva` compound variants read it. */
export interface DatePickerTableCellTriggerCompound {
  color?: DatePickerColor;
  class: string;
}

export const datePickerTableCellTriggerCompoundData: DatePickerTableCellTriggerCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `outline-${color}/25 hover:bg-${color}/10 data-today:font-semibold data-today:text-${color} data-in-range:bg-${color}/10 data-in-range:text-${color} data-selected:bg-${color} data-selected:font-medium data-selected:text-inverted`,
  })),
  {
    color: "neutral",
    class:
      "outline-inverted/25 hover:bg-elevated data-in-range:bg-elevated data-in-range:text-highlighted data-selected:bg-inverted data-selected:font-medium data-selected:text-inverted data-today:font-semibold data-today:text-highlighted",
  },
];

/**
 * Everything a DatePicker accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * Date values are Ark's `DateValue` in both frameworks; each adapter re-exports its
 * own copy's type so callers add no new dependency for it.
 */
export interface DatePickerRootProps<F> {
  color?: DatePickerColor;
  size?: DatePickerSize;
  /** Caption above the control. */
  label?: string;
  /** Shown while the field is empty. */
  placeholder?: string;
  selectionMode?: DatePickerSelectionMode;
  locale?: string;
  timeZone?: string;
  numOfMonths?: number;
  startOfWeek?: number;
  fixedWeeks?: boolean;
  /** What the range separator reads. @defaultValue `"–"` */
  rangeSeparator?: string;
  closeOnSelect?: boolean;
  openOnClick?: boolean;
  /** Show the button that empties the control. @defaultValue `true` */
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the date under this name inside a form. */
  name?: string;
  /** Replaces the calendar icon beside the field. */
  trailingIcon?: F;
  /** Replaces the cross that empties the control. */
  clearIcon?: F;
  /** Replaces the chevron stepping to the earlier period. */
  prevIcon?: F;
  /** Replaces the chevron stepping to the later period. */
  nextIcon?: F;
}
