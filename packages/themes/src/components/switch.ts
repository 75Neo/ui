import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Switch styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type SwitchColor = ComponentColor;
export type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";

export const switchDefaults = { color: "primary", size: "md", loading: false } as const;

export const switchSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
  loading: { values: [true], defaultValue: false },
} as const satisfies ComponentSchema;

export const switchParts = [
  { export: "Switch", file: "switch", contract: "SwitchRootProps" },
  { export: "SwitchControl", file: "control", contract: null },
  { export: "SwitchThumb", file: "thumb", contract: null },
  { export: "SwitchLabel", file: "label", contract: null },
  { export: "SwitchDescription", file: "description", contract: null },
] as const satisfies readonly ComponentPart[];

export const switchSizeData = {
  base: {
    xs: "gap-1.5",
    sm: "gap-2",
    md: "gap-2",
    lg: "gap-2.5",
    xl: "gap-2.5",
  },
  control: {
    xs: "h-3 w-5",
    sm: "h-3.5 w-6",
    md: "h-4 w-7",
    lg: "h-4.5 w-8",
    xl: "h-5 w-9",
  },
  thumb: {
    xs: "size-2 data-[state=checked]:translate-x-2 rtl:data-[state=checked]:-translate-x-2",
    sm: "size-2.5 data-[state=checked]:translate-x-2.5 rtl:data-[state=checked]:-translate-x-2.5",
    md: "size-3 data-[state=checked]:translate-x-3 rtl:data-[state=checked]:-translate-x-3",
    lg: "size-3.5 data-[state=checked]:translate-x-3.5 rtl:data-[state=checked]:-translate-x-3.5",
    xl: "size-4 data-[state=checked]:translate-x-4 rtl:data-[state=checked]:-translate-x-4",
  },
  checkedIcon: {
    xs: "size-1.5",
    sm: "size-2",
    md: "size-2",
    lg: "size-2.5",
    xl: "size-3",
  },
  uncheckedIcon: {
    xs: "size-1.5",
    sm: "size-2",
    md: "size-2",
    lg: "size-2.5",
    xl: "size-3",
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
} as const satisfies Record<string, Record<SwitchSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface SwitchControlCompound {
  color?: SwitchColor;
  class: string;
}

export const switchControlCompoundData: SwitchControlCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `outline-${color}/25 data-[state=checked]:bg-${color} hover:data-[state=checked]:bg-${color}/75`,
  })),
  {
    color: "neutral",
    class:
      "outline-inverted/25 data-[state=checked]:bg-inverted hover:data-[state=checked]:bg-inverted/90",
  },
];

/**
 * Everything a Switch accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The checked state is not here: React spells it `checked` with `onCheckedChange`,
 * Vue spells it `v-model:checked`, so each adapter takes it from Ark's root instead.
 */
export interface SwitchRootProps<F> {
  color?: SwitchColor;
  size?: SwitchSize;
  /** Text beside the control. Clicking it flips. */
  label?: string;
  /** A quieter second line under the label. */
  description?: string;
  /** Shown inside the thumb while on. */
  checkedIcon?: F;
  /** Shown inside the thumb while off. */
  uncheckedIcon?: F;
  /** Spins whichever icon the thumb is showing, and disables the control. */
  loading?: boolean;
  /** Replaces the default spinner. */
  loadingIcon?: F;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits under this name inside a form. */
  name?: string;
  value?: string;
  form?: string;
}
