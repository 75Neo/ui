import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Checkbox styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type CheckboxColor = ComponentColor;
export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";

export const checkboxDefaults = { color: "primary", size: "md" } as const;

export const checkboxSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const checkboxParts = [
  { export: "Checkbox", file: "checkbox", contract: "CheckboxRootProps" },
  { export: "CheckboxControl", file: "control", contract: null },
  { export: "CheckboxIndicator", file: "indicator", contract: null },
  { export: "CheckboxLabel", file: "label", contract: null },
  { export: "CheckboxDescription", file: "description", contract: null },
] as const satisfies readonly ComponentPart[];

export const checkboxSizeData = {
  base: {
    xs: "gap-1.5",
    sm: "gap-2",
    md: "gap-2",
    lg: "gap-2.5",
    xl: "gap-2.5",
  },
  container: {
    xs: "h-4",
    sm: "h-4",
    md: "h-5",
    lg: "h-5",
    xl: "h-6",
  },
  control: {
    xs: "size-3",
    sm: "size-3.5",
    md: "size-4",
    lg: "size-4.5",
    xl: "size-5",
  },
  indicator: {
    xs: "size-2",
    sm: "size-2.5",
    md: "size-3",
    lg: "size-3.5",
    xl: "size-4",
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
} as const satisfies Record<string, Record<CheckboxSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface CheckboxControlCompound {
  color?: CheckboxColor;
  class: string;
}

export const checkboxControlCompoundData: CheckboxControlCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `outline-${color}/25 data-[state=checked]:bg-${color} data-[state=checked]:ring-${color} hover:data-[state=checked]:bg-${color}/75 data-[state=indeterminate]:bg-${color} data-[state=indeterminate]:ring-${color} hover:data-[state=indeterminate]:bg-${color}/75`,
  })),
  {
    color: "neutral",
    class:
      "outline-inverted/25 data-[state=checked]:bg-inverted data-[state=checked]:ring-inverted hover:data-[state=checked]:bg-inverted/90 data-[state=indeterminate]:bg-inverted data-[state=indeterminate]:ring-inverted hover:data-[state=indeterminate]:bg-inverted/90",
  },
];

/**
 * Everything a Checkbox accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The checked state is not here: React spells it `checked` with `onCheckedChange`,
 * Vue spells it `v-model:checked`, so each adapter takes it from Ark's root instead.
 * It is `boolean | "indeterminate"` in both.
 */
export interface CheckboxRootProps<F> {
  color?: CheckboxColor;
  size?: CheckboxSize;
  /** Text beside the box. Clicking it toggles. */
  label?: string;
  /** A quieter second line under the label. */
  description?: string;
  /** Replaces the tick. */
  icon?: F;
  /** Replaces the dash of the third state. */
  indeterminateIcon?: F;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits under this name inside a form. */
  name?: string;
  value?: string;
  form?: string;
}
