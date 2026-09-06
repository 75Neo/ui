import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * NumberInput styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The two buttons are placed by the `orientation` variant and nothing else, so the
 * markup is one shape and the adapters have no branch in them. Horizontal puts one at
 * each end of a flex row and centres the number between them, which is the shape a
 * quantity picker wants. Vertical stacks them in a second grid column at the trailing
 * edge, which is the shape a form field wants.
 *
 * Neither arrangement needs a wrapper element around the pair. The row places its
 * three children with `order`, and the column places them by grid line, so the same
 * three elements serve both and there is no slot that exists only to hold two others.
 *
 * The ring is drawn on the control with `focus-within`, because the input, the
 * increment and the decrement are three focusable things inside one box that has to
 * read as a single field.
 */

export type NumberInputColor = ComponentColor;
export type NumberInputSize = "sm" | "md" | "lg";
export type NumberInputOrientation = "horizontal" | "vertical";

export const numberInputDefaults = {
  color: "primary",
  size: "md",
  orientation: "horizontal",
} as const;

export const numberInputSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
  orientation: { values: ["horizontal", "vertical"], defaultValue: "horizontal" },
} as const satisfies ComponentSchema;

export const numberInputParts = [
  { export: "NumberInput", file: "number-input", contract: "NumberInputRootProps" },
  { export: "NumberInputLabel", file: "label", contract: null },
  { export: "NumberInputControl", file: "control", contract: null },
  { export: "NumberInputInput", file: "input", contract: null },
  { export: "NumberInputDecrementTrigger", file: "decrement-trigger", contract: null },
  { export: "NumberInputIncrementTrigger", file: "increment-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const numberInputSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  control: {
    sm: "h-7 rounded-md",
    md: "h-9 rounded-md",
    lg: "h-10 rounded-md",
  },
  input: {
    sm: "px-2 text-xs",
    md: "px-2.5 text-sm",
    lg: "px-3 text-sm",
  },
  decrementTrigger: {
    sm: "[&>svg]:size-3",
    md: "[&>svg]:size-3.5",
    lg: "[&>svg]:size-4",
  },
  incrementTrigger: {
    sm: "[&>svg]:size-3",
    md: "[&>svg]:size-3.5",
    lg: "[&>svg]:size-4",
  },
} as const satisfies Record<string, Record<NumberInputSize, string>>;

export const numberInputOrientationData = {
  control: {
    horizontal: "flex items-center",
    vertical: "grid grid-cols-[minmax(0,1fr)_auto] grid-rows-2",
  },
  input: {
    horizontal: "order-2 flex-1 text-center",
    vertical: "col-start-1 row-span-2",
  },
  decrementTrigger: {
    horizontal: "order-1 h-full shrink-0 border-e border-default",
    vertical: "col-start-2 row-start-2 border-s border-t border-default",
  },
  incrementTrigger: {
    horizontal: "order-3 h-full shrink-0 border-s border-default",
    vertical: "col-start-2 row-start-1 border-s border-default",
  },
} as const satisfies Record<string, Record<NumberInputOrientation, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface NumberInputControlCompound {
  color?: NumberInputColor;
  class: string;
}

export const numberInputControlCompoundData: NumberInputControlCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-within:ring-2 focus-within:ring-${color}`,
  })),
  { color: "neutral", class: "focus-within:ring-2 focus-within:ring-inverted" },
];

/**
 * Everything a NumberInput accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface NumberInputRootProps<F> {
  color?: NumberInputColor;
  size?: NumberInputSize;
  /** Where the two buttons go. @defaultValue `"horizontal"` */
  orientation?: NumberInputOrientation;
  /** Caption above the control. */
  label?: string;
  /** Shown while the field is empty. */
  placeholder?: string;
  min?: number;
  max?: number;
  /** How far one press or one arrow key moves the value. @defaultValue `1` */
  step?: number;
  /** How far a press moves it with Shift held. @defaultValue ten steps */
  largeStep?: number;
  /** How far a press moves it with Alt held. @defaultValue a tenth of a step */
  smallStep?: number;
  formatOptions?: Intl.NumberFormatOptions;
  /** The locale the format is read in. Falls back to the one the App publishes. */
  locale?: string;
  /** Let the wheel change the value while the field has focus. */
  allowMouseWheel?: boolean;
  clampValueOnBlur?: boolean;
  /** Accept a typed value outside the range. @defaultValue `false` */
  allowOverflow?: boolean;
  /** Keep stepping while a button is held down. @defaultValue `true` */
  spinOnPress?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  /** Replaces the minus. */
  decrementIcon?: F;
  /** Replaces the plus. */
  incrementIcon?: F;
}
