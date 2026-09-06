import type { ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Dialog styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type DialogColor = ComponentColor;
export type DialogSize = "sm" | "md" | "lg" | "xl";

export const dialogDefaults = { size: "md", transition: true, fullscreen: false } as const;

export const dialogSchema = {
  size: { values: ["sm", "md", "lg", "xl"], defaultValue: "md" },
  transition: { values: [true], defaultValue: true },
  fullscreen: { values: [true], defaultValue: false },
} as const satisfies ComponentSchema;

export const dialogParts = [
  { export: "Dialog", file: "dialog", contract: "DialogRootProps" },
  { export: "DialogTrigger", file: "trigger", contract: null },
  { export: "DialogBackdrop", file: "backdrop", contract: null },
  { export: "DialogContent", file: "content", contract: "DialogContentProps" },
  { export: "DialogHeader", file: "header", contract: null },
  { export: "DialogTitle", file: "title", contract: null },
  { export: "DialogDescription", file: "description", contract: null },
  { export: "DialogBody", file: "body", contract: null },
  { export: "DialogFooter", file: "footer", contract: null },
  { export: "DialogCloseTrigger", file: "close-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const dialogSizeData = {
  base: {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  },
  header: {
    sm: "px-4 py-3",
    md: "px-5 py-4",
    lg: "px-6 py-5",
    xl: "px-6 py-5",
  },
  title: {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  },
  description: {
    sm: "text-xs/5",
    md: "text-sm/6",
    lg: "text-sm/6",
    xl: "text-base/6",
  },
  body: {
    sm: "px-4 py-3 text-sm/6",
    md: "px-5 py-4 text-sm/6",
    lg: "px-6 py-5 text-base/7",
    xl: "px-6 py-5 text-base/7",
  },
  footer: {
    sm: "px-4 py-3",
    md: "px-5 py-4",
    lg: "px-6 py-5",
    xl: "px-6 py-5",
  },
  closeTrigger: {
    sm: "size-6 p-1",
    md: "size-7 p-1.5",
    lg: "size-8 p-1.5",
    xl: "size-8 p-1.5",
  },
} as const satisfies Record<string, Record<DialogSize, string>>;

/**
 * Everything a Dialog accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells
 * it `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * The trigger is the component's own children, handed to Ark with `asChild`. Dismissal
 * is one prop driving Ark's two halves: left `undefined` rather than `true` when it
 * is on, so Ark's own defaults stand.
 */
export interface DialogRootProps<F> {
  size?: DialogSize;
  /** Whether the panel and the overlay animate in and out. @defaultValue `true` */
  transition?: boolean;
  /** Fills the viewport instead of sitting in the middle of it. @defaultValue `false` */
  fullscreen?: boolean;
  /** The panel's heading. */
  title?: string;
  /** A quieter line under the heading. */
  description?: string;
  /** Replaces the whole header, including the title, description and close button. */
  header?: F;
  /** The panel's main content. */
  body?: F;
  /** The row along the bottom of the panel, usually buttons. */
  footer?: F;
  /** Whether a backdrop dims the page behind the panel. @defaultValue `true` */
  overlay?: boolean;
  /** Close on Escape and on outside press together. @defaultValue `true` */
  dismissible?: boolean;
  /** Show the cross in the header corner. @defaultValue `true` */
  close?: boolean;
  /** Replaces the cross. */
  closeIcon?: F;
  modal?: boolean;
  role?: "dialog" | "alertdialog";
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Wait until first open to mount the panel. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the panel again on close. @defaultValue `false` */
  unmountOnExit?: boolean;
}

/**
 * The panel. Off is for a caller who would rather animate it themselves.
 *
 * @remarks
 * Part props, not root ones: they are consumed by exactly one part each, and only
 * opacity ever animates.
 */
export interface DialogContentProps {
  /** @defaultValue `true` */
  transition?: boolean;
  /** Fills the viewport instead of sitting in the middle of it. @defaultValue `false` */
  fullscreen?: boolean;
}
