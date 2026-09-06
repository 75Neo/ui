import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * DateInput styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The smallest unit the field asks for is written out rather than imported from
 * Ark, because `@75neo/themes` depends on no framework and so on neither adapter's
 * copy of it. A mismatch would fail the adapters' typecheck rather than go
 * unnoticed.
 */

export type DateInputColor = ComponentColor;
export type DateInputSize = "sm" | "md" | "lg";

/** The smallest unit the field asks for. */
export type DateInputGranularity = "day" | "hour" | "minute" | "second";

export const dateInputDefaults = { color: "primary", size: "md" } as const;

export const dateInputSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const dateInputParts = [
  { export: "DateInput", file: "date-input", contract: "DateInputRootProps" },
  { export: "DateInputLabel", file: "label", contract: null },
  { export: "DateInputControl", file: "control", contract: null },
  { export: "DateInputSegmentGroup", file: "segment-group", contract: null },
  { export: "DateInputSegment", file: "segment", contract: null },
] as const satisfies readonly ComponentPart[];

export const dateInputSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  control: {
    sm: "h-7 gap-1.5 rounded-md px-2.5 text-xs",
    md: "h-9 gap-2 rounded-md px-3 text-sm",
    lg: "h-10 gap-2 rounded-md px-3.5 text-sm",
  },
  leadingIcon: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  segment: {
    sm: "px-0.5",
    md: "px-0.5",
    lg: "px-1",
  },
  separator: {
    sm: "px-1 text-xs",
    md: "px-1.5 text-sm",
    lg: "px-2 text-sm",
  },
} as const satisfies Record<string, Record<DateInputSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface DateInputControlCompound {
  color?: DateInputColor;
  class: string;
}

export const dateInputControlCompoundData: DateInputControlCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-within:ring-2 focus-within:ring-${color}`,
  })),
  { color: "neutral", class: "focus-within:ring-2 focus-within:ring-inverted" },
];

/** One colour row, as `cva` compound variants read it. */
export interface DateInputSegmentCompound {
  color?: DateInputColor;
  class: string;
}

export const dateInputSegmentCompoundData: DateInputSegmentCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `data-focus:bg-${color}/10 data-focus:text-${color}`,
  })),
  {
    color: "neutral",
    class: "data-focus:bg-elevated data-focus:text-highlighted",
  },
];

/**
 * Settle the whitespace inside a literal segment so a server and a browser agree on it.
 *
 * @param text - The segment text Ark computed from `Intl.DateTimeFormat`.
 * @returns The same text with every exotic space written as a plain one.
 *
 * @remarks
 * ICU changed its mind about the space before AM and PM: recent versions emit a narrow
 * no-break space, U+202F, and older ones a plain U+0020. A page rendered by Node and
 * hydrated by a browser can therefore disagree about a character nobody can see, and
 * both frameworks call that a hydration mismatch — React loudly, Vue in a code path that
 * its own `data-allow-mismatch` escape hatch does not reach. Rewriting the character in
 * both adapters makes the two runs agree instead of asking either to look away.
 *
 * Only literal segments go through this. They are the punctuation the locale puts
 * between the editable parts, they are `aria-hidden`, and nothing reads them back, so
 * flattening a space inside one costs nothing. An editable segment holds digits and is
 * left alone.
 */
export function dateInputLiteralText(text: string): string {
  return text.replace(/[\u00a0\u202f\u2009]/g, " ");
}

/**
 * Everything a DateInput accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface DateInputRootProps<F> {
  color?: DateInputColor;
  size?: DateInputSize;
  /** Caption above the control. */
  label?: string;
  selectionMode?: "single" | "range";
  granularity?: DateInputGranularity;
  locale?: string;
  timeZone?: string;
  shouldForceLeadingZeros?: boolean;
  hideTimeZone?: boolean;
  /** What the range separator reads. @defaultValue `"–"` */
  rangeSeparator?: string;
  /** Icon shown before the field. */
  leadingIcon?: F;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the date under this name inside a form. */
  name?: string;
}
