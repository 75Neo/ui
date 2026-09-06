import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Drawer styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * A dialog docked to an edge: the same panel parts, `placement` deciding which edge
 * and `size` how far it reaches. The recipe's rounding follows the same direction,
 * and the compound rows below are placement × size, not color — a drawer has no
 * color axis.
 */

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl";

export const drawerDefaults = { placement: "right", size: "md" } as const;

export const drawerSchema = {
  placement: { values: ["left", "right", "top", "bottom"], defaultValue: "right" },
  size: { values: ["sm", "md", "lg", "xl"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const drawerParts = [
  { export: "Drawer", file: "drawer", contract: "DrawerRootProps" },
  { export: "DrawerTrigger", file: "trigger", contract: null },
  { export: "DrawerBackdrop", file: "backdrop", contract: null },
  { export: "DrawerContent", file: "content", contract: "DrawerContentProps" },
  { export: "DrawerHeader", file: "header", contract: null },
  { export: "DrawerTitle", file: "title", contract: null },
  { export: "DrawerDescription", file: "description", contract: null },
  { export: "DrawerBody", file: "body", contract: null },
  { export: "DrawerFooter", file: "footer", contract: null },
  { export: "DrawerCloseTrigger", file: "close-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const drawerPlacementData = {
  positioner: {
    left: "items-stretch justify-start",
    right: "items-stretch justify-end",
    top: "flex-col items-stretch justify-start",
    bottom: "flex-col items-stretch justify-end",
  },
  base: {
    left: "h-dvh rounded-e-2xl",
    right: "h-dvh rounded-s-2xl",
    top: "rounded-b-2xl",
    bottom: "rounded-t-2xl",
  },
} as const satisfies Record<string, Record<DrawerPlacement, string>>;

/**
 * A width on a side drawer, a height on a top or bottom one. The maximum keeps a
 * large drawer inside the viewport.
 */
export interface DrawerPanelCompound {
  placement?: DrawerPlacement;
  size?: DrawerSize;
  class: string;
}

export const drawerPanelCompoundData: DrawerPanelCompound[] = [
  { placement: "left", size: "sm", class: "w-72 max-w-[calc(100dvw-2rem)]" },
  { placement: "right", size: "sm", class: "w-72 max-w-[calc(100dvw-2rem)]" },
  { placement: "top", size: "sm", class: "h-56 max-h-[calc(100dvh-2rem)] w-full" },
  { placement: "bottom", size: "sm", class: "h-56 max-h-[calc(100dvh-2rem)] w-full" },
  { placement: "left", size: "md", class: "w-80 max-w-[calc(100dvw-2rem)]" },
  { placement: "right", size: "md", class: "w-80 max-w-[calc(100dvw-2rem)]" },
  { placement: "top", size: "md", class: "h-72 max-h-[calc(100dvh-2rem)] w-full" },
  { placement: "bottom", size: "md", class: "h-72 max-h-[calc(100dvh-2rem)] w-full" },
  { placement: "left", size: "lg", class: "w-96 max-w-[calc(100dvw-2rem)]" },
  { placement: "right", size: "lg", class: "w-96 max-w-[calc(100dvw-2rem)]" },
  { placement: "top", size: "lg", class: "h-96 max-h-[calc(100dvh-2rem)] w-full" },
  { placement: "bottom", size: "lg", class: "h-96 max-h-[calc(100dvh-2rem)] w-full" },
  { placement: "left", size: "xl", class: "w-[28rem] max-w-[calc(100dvw-2rem)]" },
  { placement: "right", size: "xl", class: "w-[28rem] max-w-[calc(100dvw-2rem)]" },
  { placement: "top", size: "xl", class: "h-[32rem] max-h-[calc(100dvh-2rem)] w-full" },
  { placement: "bottom", size: "xl", class: "h-[32rem] max-h-[calc(100dvh-2rem)] w-full" },
];

/**
 * Everything a Drawer accepts in both frameworks. Each adapter adds its own
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
export interface DrawerRootProps<F> {
  placement?: DrawerPlacement;
  size?: DrawerSize;
  /** Whether the panel and the overlay animate in and out. @defaultValue `true` */
  transition?: boolean;
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
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Wait until first open to mount the panel. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the panel again on close. @defaultValue `false` */
  unmountOnExit?: boolean;
  draggable?: boolean;
}

/**
 * The panel. Off is for a caller who would rather animate it themselves.
 *
 * @remarks
 * A part prop, not a root one: it is consumed by exactly one part, and only
 * opacity ever animates.
 */
export interface DrawerContentProps {
  /** @defaultValue `true` */
  transition?: boolean;
}
