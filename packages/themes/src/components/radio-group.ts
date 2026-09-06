import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * RadioGroup styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * Orientation is not a variant. The group stacks, or wraps in a row, off the
 * `data-orientation` attribute Ark sets — and the legend hides itself in a row,
 * because a heading above a horizontal wrap names nothing.
 */

export type RadioGroupColor = ComponentColor;
export type RadioGroupSize = "xs" | "sm" | "md" | "lg" | "xl";

export const radioGroupDefaults = { color: "primary", size: "md" } as const;

export const radioGroupSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const radioGroupParts = [
  { export: "RadioGroup", file: "radio-group", contract: "RadioGroupRootProps" },
  { export: "RadioGroupLegend", file: "legend", contract: null },
  { export: "RadioGroupItem", file: "item", contract: "RadioGroupItemProps" },
  { export: "RadioGroupItemControl", file: "item-control", contract: null },
  { export: "RadioGroupItemIndicator", file: "item-indicator", contract: null },
  { export: "RadioGroupItemText", file: "item-text", contract: null },
  { export: "RadioGroupItemDescription", file: "item-description", contract: null },
] as const satisfies readonly ComponentPart[];

export const radioGroupSizeData = {
  item: {
    xs: "gap-1.5",
    sm: "gap-2",
    md: "gap-2",
    lg: "gap-2.5",
    xl: "gap-2.5",
  },
  control: {
    xs: "size-3",
    sm: "size-3.5",
    md: "size-4",
    lg: "size-4.5",
    xl: "size-5",
  },
  indicator: {
    xs: "size-1",
    sm: "size-1.5",
    md: "size-1.5",
    lg: "size-2",
    xl: "size-2",
  },
  label: {
    xs: "text-xs/4",
    sm: "text-xs/4",
    md: "text-sm/5",
    lg: "text-sm/5",
    xl: "text-base/6",
  },
  description: {
    xs: "text-xs/4",
    sm: "text-xs/4",
    md: "text-sm/5",
    lg: "text-sm/5",
    xl: "text-base/6",
  },
} as const satisfies Record<string, Record<RadioGroupSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface RadioGroupControlCompound {
  color?: RadioGroupColor;
  class: string;
}

export const radioGroupControlCompoundData: RadioGroupControlCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `outline-${color}/25 data-[state=checked]:bg-${color} data-[state=checked]:ring-${color} hover:data-[state=checked]:bg-${color}/75`,
  })),
  {
    color: "neutral",
    class:
      "outline-inverted/25 data-[state=checked]:bg-inverted data-[state=checked]:ring-inverted hover:data-[state=checked]:bg-inverted/90",
  },
];

/**
 * One option in the group. Its own shape, deliberately not shared: an option
 * carries text where a list item carries an icon, and coupling them would be the
 * wrong kind of reuse.
 */
export interface RadioGroupOption {
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
 * The selection is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead.
 */
export interface RadioGroupRootProps {
  color?: RadioGroupColor;
  size?: RadioGroupSize;
  /** The options to offer. */
  items: RadioGroupOption[];
  /**
   * Names the group for a screen reader, and heads it on screen.
   *
   * @remarks
   * Read the recipe note before removing this: in a horizontal row the legend hides
   * itself, because a heading above a wrap names nothing.
   */
  legend?: string;
  /** @defaultValue `"vertical"` */
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the choice under this name inside a form. */
  name?: string;
  form?: string;
}

/**
 * One option, for custom composition.
 */
export interface RadioGroupItemProps {
  /** The option this row draws. */
  item: RadioGroupOption;
}
