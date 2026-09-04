import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the NumberInput: a field holding one number, and the two buttons that
 * step it.
 *
 * @remarks
 * The two buttons are placed by the `orientation` variant and nothing else, so the
 * markup is one shape and the adapters have no branch in them. Horizontal puts one at
 * each end of a flex row and centres the number between them, which is the shape a
 * quantity picker wants. Vertical stacks them in a second grid column at the trailing
 * edge, which is the shape a form field wants.
 *
 * Neither arrangement needs a wrapper element around the pair. The row places its three
 * children with `order`, and the column places them by grid line, so the same three
 * elements serve both and there is no slot that exists only to hold two others.
 *
 * The ring is drawn on the control with `focus-within`, because the input, the
 * increment and the decrement are three focusable things inside one box that has to
 * read as a single field — the same reason the Combobox draws its ring that way.
 *
 * Ark disables a trigger the moment stepping further would leave the range, and it is
 * a real `button`, so `disabled:` is what styles it. The input is a real input and
 * carries the attribute too.
 */
export const numberInput = tv({
  slots: {
    base: "flex w-full min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    control:
      "w-full min-w-0 overflow-hidden bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
    input:
      "min-w-0 bg-transparent text-highlighted tabular-nums outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
    decrementTrigger:
      "inline-flex cursor-pointer items-center justify-center text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent",
    incrementTrigger:
      "inline-flex cursor-pointer items-center justify-center text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent",
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
        control: "h-7 rounded-md",
        input: "px-2 text-xs",
        decrementTrigger: "[&>svg]:size-3",
        incrementTrigger: "[&>svg]:size-3",
      },
      md: {
        label: "text-sm",
        control: "h-9 rounded-md",
        input: "px-2.5 text-sm",
        decrementTrigger: "[&>svg]:size-3.5",
        incrementTrigger: "[&>svg]:size-3.5",
      },
      lg: {
        label: "text-sm",
        control: "h-10 rounded-md",
        input: "px-3 text-sm",
        decrementTrigger: "[&>svg]:size-4",
        incrementTrigger: "[&>svg]:size-4",
      },
    },
    /**
     * Where the two buttons go.
     *
     * @remarks
     * `horizontal` is one button at each end with the number between them, which reads
     * as a quantity. `vertical` stacks them at the trailing edge and leaves the number
     * where a reader of the rest of the form expects to find it.
     */
    orientation: {
      horizontal: {
        control: "flex items-center",
        input: "order-2 flex-1 text-center",
        decrementTrigger: "order-1 h-full shrink-0 border-e border-default",
        incrementTrigger: "order-3 h-full shrink-0 border-s border-default",
      },
      vertical: {
        control: "grid grid-cols-[minmax(0,1fr)_auto] grid-rows-2",
        input: "col-start-1 row-span-2",
        decrementTrigger: "col-start-2 row-start-2 border-s border-t border-default",
        incrementTrigger: "col-start-2 row-start-1 border-s border-default",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { control: `focus-within:ring-2 focus-within:ring-${color}` },
    })),
    {
      color: "neutral",
      class: { control: "focus-within:ring-2 focus-within:ring-inverted" },
    },
    // The buttons are square in a row and half as tall in a column, so their widths
    // belong to the pair of variants rather than to either one.
    {
      orientation: "horizontal",
      size: "sm",
      class: { decrementTrigger: "w-6", incrementTrigger: "w-6" },
    },
    {
      orientation: "horizontal",
      size: "md",
      class: { decrementTrigger: "w-8", incrementTrigger: "w-8" },
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: { decrementTrigger: "w-9", incrementTrigger: "w-9" },
    },
    {
      orientation: "vertical",
      size: "sm",
      class: { decrementTrigger: "w-5", incrementTrigger: "w-5" },
    },
    {
      orientation: "vertical",
      size: "md",
      class: { decrementTrigger: "w-6", incrementTrigger: "w-6" },
    },
    {
      orientation: "vertical",
      size: "lg",
      class: { decrementTrigger: "w-7", incrementTrigger: "w-7" },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    orientation: "horizontal",
  },
});

export type NumberInputVariants = VariantProps<typeof numberInput>;
export type NumberInputSlots = keyof ReturnType<typeof numberInput>;

export type NumberInputUI = TVSlot<NumberInputSlots>;

export type NumberInputTheme = ThemeOverride<NumberInputSlots, NumberInputVariants>;

/**
 * Everything a NumberInput accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The value is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. It is a `string` in
 * both, and deliberately not a number — a half-typed `-` or `1.` is a real state a
 * field passes through, and a number has no way to hold it. `formatOptions` means the
 * text can be a currency or a percentage as well, which no number would survive either.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface NumberInputProps<F> {
  /** Per-slot class overrides. */
  ui?: NumberInputUI;
  color?: NumberInputVariants["color"];
  size?: NumberInputVariants["size"];
  /** Where the two buttons go. @defaultValue `"horizontal"` */
  orientation?: NumberInputVariants["orientation"];
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
  /**
   * How the number is written out, as `Intl.NumberFormat` options. A currency, a
   * percentage, a fixed number of decimals.
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** The locale the format is read in. Falls back to the one the App publishes. */
  locale?: string;
  /** Let the wheel change the value while the field has focus. */
  allowMouseWheel?: boolean;
  /**
   * Pull a value back inside the range when the field loses focus.
   * @defaultValue the opposite of `allowOverflow`
   */
  clampValueOnBlur?: boolean;
  /** Accept a typed value outside the range. @defaultValue `false` */
  allowOverflow?: boolean;
  /** Keep stepping while a button is held down. @defaultValue `true` */
  spinOnPress?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the value under this name inside a form. */
  name?: string;
  /** Replaces the icon on the button that steps up. */
  incrementIcon?: F;
  /** Replaces the icon on the button that steps down. */
  decrementIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type NumberInputVariantsAreExposed = MustBeNever<
  Exclude<keyof NumberInputVariants, keyof NumberInputProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    numberInput: ComponentContract<NumberInputSlots, NumberInputVariants>;
  }
}
