import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * TagsInput styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type TagsInputColor = ComponentColor;
export type TagsInputSize = "sm" | "md" | "lg";

/** What happens to half-typed text when the field loses focus. */
export type TagsInputBlurBehavior = "add" | "clear";

/** A candidate tag, for the `validate` gate. Mirrors Ark's shape in both adapters. */
export interface TagsInputCandidate {
  /** The text being validated. */
  inputValue: string;
  /** The tags already held. */
  value: string[];
}

export const tagsInputDefaults = { color: "primary", size: "md" } as const;

export const tagsInputSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const tagsInputParts = [
  { export: "TagsInput", file: "tags-input", contract: "TagsInputRootProps" },
  { export: "TagsInputLabel", file: "label", contract: null },
  { export: "TagsInputControl", file: "control", contract: null },
  { export: "TagsInputItem", file: "item", contract: null },
  { export: "TagsInputItemPreview", file: "item-preview", contract: null },
  { export: "TagsInputItemText", file: "item-text", contract: null },
  { export: "TagsInputItemDeleteTrigger", file: "item-delete-trigger", contract: null },
  { export: "TagsInputItemInput", file: "item-input", contract: null },
  { export: "TagsInputInput", file: "input", contract: null },
  { export: "TagsInputClearTrigger", file: "clear-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const tagsInputSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  control: {
    sm: "min-h-7 gap-1 rounded-md p-1 ps-1.5",
    md: "min-h-9 gap-1.5 rounded-md p-1.5 ps-2",
    lg: "min-h-10 gap-2 rounded-md p-2 ps-2.5",
  },
  itemPreview: {
    sm: "h-5 gap-1 px-1.5 text-xs",
    md: "h-6 gap-1.5 px-2 text-sm",
    lg: "h-7 gap-2 px-2.5 text-sm",
  },
  itemDeleteTrigger: {
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
  },
  itemInput: {
    sm: "h-5 px-1.5 text-xs",
    md: "h-6 px-2 text-sm",
    lg: "h-7 px-2.5 text-sm",
  },
  input: {
    sm: "h-5 px-1 text-xs",
    md: "h-6 px-1 text-sm",
    lg: "h-7 px-1 text-sm",
  },
  clearTrigger: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-4",
  },
} as const satisfies Record<string, Record<TagsInputSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface TagsInputControlCompound {
  color?: TagsInputColor;
  class: string;
}

export const tagsInputControlCompoundData: TagsInputControlCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `focus-within:ring-2 focus-within:ring-${color}`,
  })),
  { color: "neutral", class: "focus-within:ring-2 focus-within:ring-inverted" },
];

/** One colour row, as `cva` compound variants read it. */
export interface TagsInputItemPreviewCompound {
  color?: TagsInputColor;
  class: string;
}

export const tagsInputItemPreviewCompoundData: TagsInputItemPreviewCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `data-highlighted:bg-${color}/10 data-highlighted:text-${color}`,
  })),
  {
    color: "neutral",
    class: "data-highlighted:bg-accented data-highlighted:text-highlighted",
  },
];

/**
 * Everything a TagsInput accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface TagsInputRootProps<F> {
  color?: TagsInputColor;
  size?: TagsInputSize;
  /** Caption above the control. */
  label?: string;
  /** Shown in the field while nothing is being typed. */
  placeholder?: string;
  /** How many tags are allowed. @defaultValue no limit */
  max?: number;
  /** How long one tag's text may be. */
  maxLength?: number;
  /** What ends a tag, and what a pasted string is split on. @defaultValue `","` */
  delimiter?: string | RegExp;
  /** Turn pasted text into tags rather than into half-typed text. */
  addOnPaste?: boolean;
  /** Accept a tag that is already there. */
  allowDuplicates?: boolean;
  allowOverflow?: boolean;
  /** Let a tag be rewritten by double-clicking it or pressing Enter on it. @defaultValue `true` */
  editable?: boolean;
  /** What happens to half-typed text when the field loses focus. */
  blurBehavior?: TagsInputBlurBehavior;
  /** Put the caret in the field on mount. */
  autoFocus?: boolean;
  /** Show the button that removes every tag. @defaultValue `true` */
  clearable?: boolean;
  /** Decide whether a candidate may become a tag. */
  validate?: (details: TagsInputCandidate) => boolean;
  /** Submits the tags under this name inside a form. */
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Replaces the cross on a tag. */
  deleteIcon?: F;
  /** Replaces the cross that removes every tag. */
  clearIcon?: F;
}
