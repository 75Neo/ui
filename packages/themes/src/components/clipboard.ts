import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Clipboard styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The color variant reaches the trigger only. The field around it is furniture, and
 * a command box that changed color with the accent would compete with whatever it
 * sits next to. Copied state is signalled by swapping the icon, which Ark does
 * through its own indicator, so no `data-copied` class is needed.
 */

export type ClipboardColor = ComponentColor;
export type ClipboardSize = "sm" | "md" | "lg";

export const clipboardDefaults = { color: "neutral", size: "md" } as const;

export const clipboardSchema = {
  color: { values: componentColors, defaultValue: "neutral" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const clipboardParts = [
  { export: "Clipboard", file: "clipboard", contract: "ClipboardRootProps" },
  { export: "ClipboardLabel", file: "label", contract: null },
  { export: "ClipboardControl", file: "control", contract: null },
  { export: "ClipboardInput", file: "input", contract: null },
  { export: "ClipboardTrigger", file: "trigger", contract: "ClipboardTriggerProps" },
  { export: "ClipboardIndicator", file: "indicator", contract: null },
] as const satisfies readonly ComponentPart[];

export const clipboardSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  control: {
    sm: "py-1 ps-2.5 pe-1",
    md: "py-1.5 ps-3 pe-1.5",
    lg: "py-2 ps-3.5 pe-2",
  },
  input: {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  },
  trigger: {
    sm: "size-6 p-1",
    md: "size-7 p-1.5",
    lg: "size-8 p-1.5",
  },
  indicator: {
    sm: "size-4",
    md: "size-4",
    lg: "size-5",
  },
} as const satisfies Record<string, Record<ClipboardSize, string>>;

/** One row of the trigger colour table, as `cva` compound variants read it. */
export interface ClipboardTriggerCompound {
  color?: ClipboardColor;
  class: string;
}

export const clipboardTriggerCompoundData: ClipboardTriggerCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `text-${color} outline-${color}/25 hover:bg-${color}/10 active:bg-${color}/10`,
  })),
  {
    color: "neutral",
    class: "text-muted outline-inverted/25 hover:bg-elevated hover:text-default active:bg-elevated",
  },
];

/** Attribute ids Ark may need to own. */
export interface ClipboardIds {
  root?: string;
  input?: string;
  label?: string;
}

/**
 * Everything a Clipboard accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * `value` is required and uncontrolled from the component's side. Ark takes a
 * controlled value, but nothing here writes one back: the field is read-only, so the
 * only thing that can change the value is the caller passing a new one. Ark spells
 * the copied text `modelValue` in Vue and `value` in React; each adapter maps it.
 */
export interface ClipboardRootProps<F> {
  color?: ClipboardColor;
  size?: ClipboardSize;
  /** The text to copy. */
  value: string;
  /** Caption above the field. Clicking it focuses the field. */
  label?: string;
  /** How long the copied icon stays, in milliseconds. @defaultValue `3000` */
  timeout?: number;
  /** Replaces the copy icon. */
  copyIcon?: F;
  /** Replaces the icon shown just after a copy. */
  copiedIcon?: F;
  ids?: ClipboardIds;
}

/**
 * Everything a Clipboard trigger accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The trigger owns its indicator, so these glyphs ride the trigger rather than a
 * separately composed part. Standalone indicators take their glyphs directly.
 */
export interface ClipboardTriggerProps<F> {
  /** Replaces the copy icon. */
  copyIcon?: F;
  /** Replaces the icon shown just after a copy. */
  copiedIcon?: F;
}
