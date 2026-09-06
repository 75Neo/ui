import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * PasswordInput styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type PasswordInputColor = ComponentColor;
export type PasswordInputSize = "sm" | "md" | "lg";

/** What the browser may offer to fill the field with. Ark admits two values. */
export type PasswordInputAutoComplete = "current-password" | "new-password";

export const passwordInputDefaults = { color: "primary", size: "md" } as const;

export const passwordInputSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const passwordInputParts = [
  { export: "PasswordInput", file: "password-input", contract: "PasswordInputRootProps" },
  { export: "PasswordInputLabel", file: "label", contract: null },
  { export: "PasswordInputControl", file: "control", contract: null },
  { export: "PasswordInputInput", file: "input", contract: null },
  { export: "PasswordInputVisibilityTrigger", file: "visibility-trigger", contract: null },
  { export: "PasswordInputIndicator", file: "indicator", contract: null },
] as const satisfies readonly ComponentPart[];

export const passwordInputSizeData = {
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
  leadingIcon: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  input: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  visibilityTrigger: {
    sm: "size-4",
    md: "size-4",
    lg: "size-5",
  },
  indicator: {
    sm: "size-4",
    md: "size-4",
    lg: "size-5",
  },
} as const satisfies Record<string, Record<PasswordInputSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface PasswordInputControlCompound {
  color?: PasswordInputColor;
  class: string;
}

export const passwordInputControlCompoundData: PasswordInputControlCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-within:ring-2 focus-within:ring-${color}`,
  })),
  { color: "neutral", class: "focus-within:ring-2 focus-within:ring-inverted" },
];

/**
 * Everything a PasswordInput accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * There is no value prop, because Ark's root takes none: the field is uncontrolled
 * and both frameworks spell a controlled value too differently to share one type.
 */
export interface PasswordInputRootProps<F> {
  color?: PasswordInputColor;
  size?: PasswordInputSize;
  /** Caption above the control. */
  label?: string;
  /** Shown while the field is empty. */
  placeholder?: string;
  /** What the browser may offer to fill the field with. @defaultValue `"current-password"` */
  autoComplete?: PasswordInputAutoComplete;
  /** Submits the secret under this name inside a form. */
  name?: string;
  /** Keep password managers from touching the field. */
  ignorePasswordManagers?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Icon shown before the field, usually a lock. */
  leadingIcon?: F;
  /** Shown on the trigger while the secret is visible. */
  visibleIcon?: F;
  /** Shown on the trigger while the secret is hidden. */
  hiddenIcon?: F;
}
