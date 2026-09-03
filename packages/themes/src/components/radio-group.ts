import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the RadioGroup: a legend and the options under it, one of which is picked.
 *
 * @remarks
 * This is the Checkbox's anatomy repeated per option, and deliberately so: an option is
 * a control, a label and sometimes a quieter second line, laid out the same way, with
 * `container` giving the control a box of the label's own line height so it aligns with
 * the first line rather than the top of a two-line block.
 *
 * The dot is a child of the control rather than a border trick. Ark's own example draws
 * it by growing the control's border to five pixels, which would need a `border-<color>`
 * in the safelist for a shape the library can already make out of a filled circle and a
 * smaller one inside it. The control opens a group so the dot can read its state.
 *
 * Checked is not a variant, for the reason it is not one on the Checkbox: Ark writes
 * `data-state` on each control, and a variant resolves once for the whole group.
 * Orientation is not one either — it is read off the attribute Ark sets, which is what
 * the Accordion and the Tabs do.
 */
export const radioGroup = tv({
  slots: {
    base: "group/radio flex min-w-0 flex-col gap-2 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:items-start",
    legend:
      "font-medium text-highlighted select-none group-data-[orientation=horizontal]/radio:sr-only",
    item: "flex min-w-0 cursor-pointer items-start data-disabled:cursor-not-allowed data-disabled:opacity-75",
    container: "flex shrink-0 items-center",
    control:
      "group/control inline-flex shrink-0 items-center justify-center rounded-full bg-default ring ring-accented transition-colors ring-inset data-focus-visible:outline-3 data-invalid:ring-error hover:data-[state=unchecked]:ring-inverted/50",
    indicator:
      "rounded-full bg-default opacity-0 transition-opacity group-data-[state=checked]/control:opacity-100",
    wrapper: "min-w-0 flex-1",
    label: "block font-medium text-highlighted select-none",
    description: "mt-1 text-pretty text-muted",
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
      xs: {
        legend: "text-xs",
        item: "gap-1.5",
        container: "h-4",
        control: "size-3",
        indicator: "size-1",
        label: "text-xs/4",
        description: "text-xs/4",
      },
      sm: {
        legend: "text-xs",
        item: "gap-2",
        container: "h-4",
        control: "size-3.5",
        indicator: "size-1.5",
        label: "text-xs/4",
        description: "text-xs/4",
      },
      md: {
        legend: "text-sm",
        item: "gap-2",
        container: "h-5",
        control: "size-4",
        indicator: "size-1.5",
        label: "text-sm/5",
        description: "text-sm/5",
      },
      lg: {
        legend: "text-sm",
        item: "gap-2.5",
        container: "h-5",
        control: "size-4.5",
        indicator: "size-2",
        label: "text-sm/5",
        description: "text-sm/5",
      },
      xl: {
        legend: "text-base",
        item: "gap-2.5",
        container: "h-6",
        control: "size-5",
        indicator: "size-2",
        label: "text-base/6",
        description: "text-base/6",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        control: `outline-${color}/25 data-[state=checked]:bg-${color} data-[state=checked]:ring-${color} hover:data-[state=checked]:bg-${color}/75`,
      },
    })),
    {
      color: "neutral",
      class: {
        control:
          "outline-inverted/25 data-[state=checked]:bg-inverted data-[state=checked]:ring-inverted hover:data-[state=checked]:bg-inverted/90",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type RadioGroupVariants = VariantProps<typeof radioGroup>;
export type RadioGroupSlots = keyof ReturnType<typeof radioGroup>;

export type RadioGroupUI = TVSlot<RadioGroupSlots>;

export type RadioGroupTheme = ThemeOverride<RadioGroupSlots, RadioGroupVariants>;

/** One option in a RadioGroup. */
export interface RadioGroupItem {
  /** Submitted when this option is picked, and what `defaultValue` names. */
  value: string;
  /** Text beside the control. Clicking it picks the option. */
  label: string;
  /** A quieter second line under the label. */
  description?: string;
  disabled?: boolean;
}

/**
 * Everything a RadioGroup accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @remarks
 * There is no icon type parameter, because nothing here takes an icon: an option is a
 * control, a label and a description. The Tooltip is the only other contract without
 * one.
 *
 * The picked value is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead.
 */
export interface RadioGroupProps {
  /** Per-slot class overrides. */
  ui?: RadioGroupUI;
  color?: RadioGroupVariants["color"];
  size?: RadioGroupVariants["size"];
  /** The options to render, in order. */
  items: RadioGroupItem[];
  /**
   * Names the group for a screen reader, and heads it on screen.
   *
   * @remarks
   * A horizontal group hides it visually and keeps it for the screen reader, because a
   * legend above a single row of options reads as a stray line.
   */
  legend?: string;
  /** @defaultValue `"vertical"` */
  orientation?: "horizontal" | "vertical";
  /** Disable every option. */
  disabled?: boolean;
  readOnly?: boolean;
  /** Draw every control in the error color, whatever the group's own color is. */
  invalid?: boolean;
  required?: boolean;
  /** Submits the picked value under this name inside a form. */
  name?: string;
  /** Id of the form to submit with, for a group rendered outside it. */
  form?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type RadioGroupVariantsAreExposed = MustBeNever<
  Exclude<keyof RadioGroupVariants, keyof RadioGroupProps>
>;

declare global {
  interface Neo75ComponentThemes {
    radioGroup: ComponentContract<RadioGroupSlots, RadioGroupVariants>;
  }
}
