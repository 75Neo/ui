import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Editable styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type EditableColor = ComponentColor;
export type EditableSize = "sm" | "md" | "lg";

/** What touching the preview does. Written out rather than imported from Ark. */
export type EditableActivationMode = "click" | "dblclick" | "focus" | "none";

/** What commits the value while editing. Written out rather than imported from Ark. */
export type EditableSubmitMode = "blur" | "enter" | "none" | "both";

export const editableDefaults = { color: "primary", size: "md" } as const;

export const editableSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const editableParts = [
  { export: "Editable", file: "editable", contract: "EditableRootProps" },
  { export: "EditableLabel", file: "label", contract: null },
  { export: "EditableArea", file: "area", contract: null },
  { export: "EditablePreview", file: "preview", contract: null },
  { export: "EditableInput", file: "input", contract: null },
  { export: "EditableControl", file: "control", contract: null },
  { export: "EditableEditTrigger", file: "edit-trigger", contract: null },
  { export: "EditableSubmitTrigger", file: "submit-trigger", contract: null },
  { export: "EditableCancelTrigger", file: "cancel-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const editableSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  preview: {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-3.5 py-2 text-sm",
  },
  input: {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-3.5 py-2 text-sm",
  },
  editTrigger: {
    sm: "size-7 p-1.5",
    md: "size-9 p-2",
    lg: "size-10 p-2.5",
  },
  submitTrigger: {
    sm: "size-7 p-1.5",
    md: "size-9 p-2",
    lg: "size-10 p-2.5",
  },
  cancelTrigger: {
    sm: "size-7 p-1.5",
    md: "size-9 p-2",
    lg: "size-10 p-2.5",
  },
} as const satisfies Record<string, Record<EditableSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface EditableInputCompound {
  color?: EditableColor;
  class: string;
}

export const editableInputCompoundData: EditableInputCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-visible:ring-2 focus-visible:ring-${color}`,
  })),
  { color: "neutral", class: "focus-visible:ring-2 focus-visible:ring-inverted" },
];

/**
 * Everything an Editable accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface EditableRootProps<F> {
  color?: EditableColor;
  size?: EditableSize;
  /** Caption above the control. */
  label?: string;
  /** Shown while the field is empty. */
  placeholder?: string;
  activationMode?: EditableActivationMode;
  submitMode?: EditableSubmitMode;
  autoResize?: boolean;
  maxLength?: number;
  selectOnFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the text under this name inside a form. */
  name?: string;
  form?: string;
  /** Replaces the pencil that starts editing. */
  editIcon?: F;
  /** Replaces the check that commits. */
  submitIcon?: F;
  /** Replaces the cross that reverts. */
  cancelIcon?: F;
}
