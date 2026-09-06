import type { ComponentPart, ComponentSchema } from "../schema";
import type { Placement } from "../placement";

/**
 * Popover styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type PopoverSize = "sm" | "md" | "lg";

export const popoverDefaults = { size: "md", close: false } as const;

export const popoverSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
  close: { values: [true], defaultValue: false },
} as const satisfies ComponentSchema;

export const popoverParts = [
  { export: "Popover", file: "popover", contract: "PopoverRootProps" },
  { export: "PopoverTrigger", file: "trigger", contract: null },
  { export: "PopoverContent", file: "content", contract: "PopoverContentProps" },
  { export: "PopoverArrow", file: "arrow", contract: null },
  { export: "PopoverTitle", file: "title", contract: null },
  { export: "PopoverDescription", file: "description", contract: null },
  { export: "PopoverBody", file: "body", contract: null },
  { export: "PopoverCloseTrigger", file: "close-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const popoverSizeData = {
  base: {
    sm: "w-56 gap-1 p-3",
    md: "w-72 gap-1 p-4",
    lg: "w-96 gap-1.5 p-5",
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
  body: {
    sm: "text-sm/6",
    md: "text-sm/6",
    lg: "text-base/7",
  },
  closeTrigger: {
    sm: "size-6 p-1",
    md: "size-7 p-1.5",
    lg: "size-8 p-1.5",
  },
} as const satisfies Record<string, Record<PopoverSize, string>>;

/**
 * Everything a Popover accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells
 * it `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * The trigger is the component's own children, handed to Ark with `asChild`.
 */
export interface PopoverRootProps<F> {
  size?: PopoverSize;
  /** The panel's heading. */
  title?: string;
  /** A quieter line under the heading. */
  description?: string;
  /** The panel's main content, under the title and description. */
  body?: F;
  /** Point a small triangle back at the trigger. @defaultValue `false` */
  arrow?: boolean;
  /** Which side of the trigger the panel prefers. @defaultValue `"bottom"` */
  placement?: Placement;
  /** Gap in pixels between the trigger and the panel. @defaultValue `8` */
  offset?: number;
  dismissible?: boolean;
  modal?: boolean;
  /** Show the cross in the panel corner. @defaultValue `false` */
  close?: boolean;
  /** Replaces the cross. */
  closeIcon?: F;
  autoFocus?: boolean;
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
 * A part prop, not a root one: it is consumed by exactly one part, and only
 * opacity ever animates.
 */
export interface PopoverContentProps {
  /** @defaultValue `true` */
  transition?: boolean;
}
