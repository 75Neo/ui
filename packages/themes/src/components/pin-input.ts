import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * PinInput styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type PinInputColor = ComponentColor;
export type PinInputSize = "sm" | "md" | "lg";

/** What a box will accept. */
export type PinInputType = "numeric" | "alphanumeric" | "alphabetic";

export const defaultPinInputLength = 6;

export const pinInputDefaults = { color: "primary", size: "md" } as const;

export const pinInputSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const pinInputParts = [
  { export: "PinInput", file: "pin-input", contract: "PinInputRootProps" },
  { export: "PinInputLabel", file: "label", contract: null },
  { export: "PinInputControl", file: "control", contract: null },
  { export: "PinInputInput", file: "input", contract: null },
] as const satisfies readonly ComponentPart[];

export const pinInputSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  control: {
    sm: "gap-1.5",
    md: "gap-2",
    lg: "gap-2.5",
  },
  input: {
    sm: "size-8 rounded-md text-sm",
    md: "size-10 rounded-md text-base",
    lg: "size-12 rounded-md text-lg",
  },
} as const satisfies Record<string, Record<PinInputSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface PinInputInputCompound {
  color?: PinInputColor;
  class: string;
}

export const pinInputInputCompoundData: PinInputInputCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-visible:ring-2 focus-visible:ring-${color}`,
  })),
  { color: "neutral", class: "focus-visible:ring-2 focus-visible:ring-inverted" },
];

/**
 * Everything a PinInput accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 */
export interface PinInputRootProps {
  color?: PinInputColor;
  size?: PinInputSize;
  /** How many boxes to draw. @defaultValue `6` */
  length?: number;
  /** Caption above the row. */
  label?: string;
  /** Shown in an empty box. @defaultValue `"○"` */
  placeholder?: string;
  /** What a box will accept. @defaultValue `"numeric"` */
  type?: PinInputType;
  /** Tell the browser this is a one-time code, so it can offer one. */
  otp?: boolean;
  /** Hide each character, the way a password field does. */
  mask?: boolean;
  /** Put the caret in the first box on mount. */
  autoFocus?: boolean;
  /** Leave the row once the last box is filled. */
  blurOnComplete?: boolean;
  /** Select a box's character when the caret lands in it. */
  selectOnFocus?: boolean;
  /** What a character is checked against, on top of `type`. */
  pattern?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the joined code under this name inside a form. */
  name?: string;
}
