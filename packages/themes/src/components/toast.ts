import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Toast styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The toast's `type` comes from the store, not from a variant: the root bakes the
 * per-type fills in as literal `data-[type=…]` selectors, which the scanner reads
 * as written. Info and loading stay a card; success, warning and error fill with
 * their color and carry `text-inverted`. The store itself (`createToaster`) is
 * re-exported from each adapter, so a caller adds no new dependency.
 */

export type ToastSize = "sm" | "md" | "lg";

export const toastDefaults = { size: "md" } as const;

export const toastSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const toastParts = [
  { export: "Toaster", file: "toaster", contract: "ToasterProps" },
  { export: "ToastRoot", file: "root", contract: null },
  { export: "ToastTitle", file: "title", contract: null },
  { export: "ToastDescription", file: "description", contract: null },
  { export: "ToastActionTrigger", file: "action-trigger", contract: null },
  { export: "ToastCloseTrigger", file: "close-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const toastSizeData = {
  base: {
    sm: "w-72 gap-0.5 p-3 pe-9",
    md: "w-80 gap-0.5 p-4 pe-10",
    lg: "w-96 gap-1 p-5 pe-11",
  },
  title: {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  },
  description: {
    sm: "text-xs/5",
    md: "text-sm/6",
    lg: "text-sm/6",
  },
  closeTrigger: {
    sm: "size-6 p-1",
    md: "size-7 p-1.5",
    lg: "size-8 p-1.5",
  },
  actionTrigger: {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1 text-sm",
  },
} as const satisfies Record<string, Record<ToastSize, string>>;

/** One toast's action row, as the store carries it. */
export interface ToastAction {
  /** What the button says. */
  label: string;
  /** What the button does. */
  onClick: () => void;
}

/**
 * Everything a Toaster accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 * @typeParam S - However the framework spells the toaster store.
 *
 * @remarks
 * Placement, gap, duration and the rest of the stacking behaviour belong to the
 * store options in `createToaster`, not to this component: the toaster renders
 * what the store holds.
 */
export interface ToasterProps<F, S> {
  size?: ToastSize;
  /** The store returned by `createToaster`. */
  toaster: S;
  /** Show the cross on every toast. @defaultValue `true` */
  close?: boolean;
  /** Replaces the cross. */
  closeIcon?: F;
  /** Render the stack at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}
