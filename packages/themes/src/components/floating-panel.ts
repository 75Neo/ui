import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * FloatingPanel styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type FloatingPanelSize = "sm" | "md" | "lg";
export type FloatingPanelStage = "minimized" | "maximized" | "default";
export type FloatingPanelResizeAxis = "n" | "e" | "s" | "w" | "ne" | "nw" | "se" | "sw";

export const floatingPanelResizeAxes: readonly FloatingPanelResizeAxis[] = [
  "n",
  "e",
  "s",
  "w",
  "ne",
  "nw",
  "se",
  "sw",
];

export interface FloatingPanelPosition {
  x: number;
  y: number;
}

export interface FloatingPanelSizeValue {
  width: number;
  height: number;
}

export const floatingPanelDefaults = { size: "md" } as const;

export const floatingPanelSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const floatingPanelParts = [
  { export: "FloatingPanel", file: "floating-panel", contract: "FloatingPanelRootProps" },
  { export: "FloatingPanelDragTrigger", file: "drag-trigger", contract: null },
  { export: "FloatingPanelHeader", file: "header", contract: null },
  { export: "FloatingPanelTitle", file: "title", contract: null },
  { export: "FloatingPanelControl", file: "control", contract: null },
  { export: "FloatingPanelStageTrigger", file: "stage-trigger", contract: null },
  { export: "FloatingPanelCloseTrigger", file: "close-trigger", contract: null },
  { export: "FloatingPanelBody", file: "body", contract: null },
  { export: "FloatingPanelResizeTrigger", file: "resize-trigger", contract: null },
  { export: "FloatingPanelContent", file: "content", contract: "FloatingPanelContentProps" },
] as const satisfies readonly ComponentPart[];

export const floatingPanelSizeData = {
  header: {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-5 py-4",
  },
  title: {
    sm: "text-sm [&>svg]:size-4",
    md: "text-sm [&>svg]:size-5",
    lg: "text-base [&>svg]:size-5",
  },
  stageTrigger: {
    sm: "size-6 p-1",
    md: "size-7 p-1.5",
    lg: "size-8 p-1.5",
  },
  closeTrigger: {
    sm: "size-6 p-1",
    md: "size-7 p-1.5",
    lg: "size-8 p-1.5",
  },
  body: {
    sm: "px-3 py-2 text-sm/6",
    md: "px-4 py-3 text-sm/6",
    lg: "px-5 py-4 text-base/7",
  },
} as const satisfies Record<string, Record<FloatingPanelSize, string>>;

/**
 * Everything a FloatingPanel accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The open, position, size and stage states are not here: React spells them with
 * values and change callbacks, Vue spells them with `v-model`s, so each adapter takes
 * them from Ark's root instead. The controlled pixel size is `panelSize`, the variant
 * keeps `size`.
 */
export interface FloatingPanelRootProps<F> {
  size?: FloatingPanelSize;
  /** Whether the panel animates in and out. @defaultValue `true` */
  transition?: boolean;
  /** The panel's heading. */
  title?: string;
  /** Replaces the whole header, including the grip, the title and the controls. */
  header?: F;
  /** The panel's main content. */
  body?: F;
  /** Which stage buttons to offer. @defaultValue all three */
  stages?: FloatingPanelStage[];
  /** Show the cross beside the stage buttons. @defaultValue `true` */
  close?: boolean;
  /** Replaces the cross. */
  closeIcon?: F;
  /** Replaces the grip. */
  dragIcon?: F;
  /** Replaces the dash. */
  minimizeIcon?: F;
  /** Replaces the square. */
  maximizeIcon?: F;
  /** Replaces the restore glyph. */
  restoreIcon?: F;
  draggable?: boolean;
  resizable?: boolean;
  disabled?: boolean;
  closeOnEscape?: boolean;
  strategy?: "absolute" | "fixed";
  defaultPosition?: FloatingPanelPosition;
  defaultSize?: FloatingPanelSizeValue;
  panelSize?: FloatingPanelSizeValue;
  minSize?: FloatingPanelSizeValue;
  maxSize?: FloatingPanelSizeValue;
  persistRect?: boolean;
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
export interface FloatingPanelContentProps {
  /** @defaultValue `true` */
  transition?: boolean;
}
