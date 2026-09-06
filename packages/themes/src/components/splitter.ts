import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Splitter styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * Orientation is not an axis. Every part styles itself off the `data-orientation`
 * attribute Ark sets, the way the Carousel does.
 *
 * The handle is a roomy invisible bar with a small visible pill, so the grab target
 * stays generous on touch while the page keeps a hairline. The pill lights up on
 * hover, on focus and mid-drag off the handle's own state, which is why the handle
 * opens a group for it. A disabled handle is styled off `data-disabled` rather than
 * `disabled:`: Ark's resize trigger is a native button that carries only the data
 * attribute, the way the Collapsible's trigger does.
 *
 * There is no `color`. A divider carries no meaning; what it divides does.
 */

export type SplitterSize = "sm" | "md" | "lg";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface SplitterVariants {
  size: SplitterSize;
}

export const splitterDefaults = { size: "md" } as const;

export const splitterSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const splitterParts = [
  { export: "Splitter", file: "splitter", contract: "SplitterRootProps" },
  { export: "SplitterPanel", file: "panel", contract: "SplitterPanelProps" },
  {
    export: "SplitterResizeTrigger",
    file: "resize-trigger",
    contract: "SplitterResizeTriggerProps",
  },
] as const satisfies readonly ComponentPart[];

export const splitterSizeData = {
  resizeTrigger: {
    sm: "data-[orientation=horizontal]:w-2 data-[orientation=vertical]:h-2",
    md: "data-[orientation=horizontal]:w-3 data-[orientation=vertical]:h-3",
    lg: "data-[orientation=horizontal]:w-4 data-[orientation=vertical]:h-4",
  },
  indicator: {
    sm: "group-data-[orientation=horizontal]/splitter:h-6 group-data-[orientation=horizontal]/splitter:w-0.5 group-data-[orientation=vertical]/splitter:h-0.5 group-data-[orientation=vertical]/splitter:w-6",
    md: "group-data-[orientation=horizontal]/splitter:h-8 group-data-[orientation=horizontal]/splitter:w-1 group-data-[orientation=vertical]/splitter:h-1 group-data-[orientation=vertical]/splitter:w-8",
    lg: "group-data-[orientation=horizontal]/splitter:h-10 group-data-[orientation=horizontal]/splitter:w-1.5 group-data-[orientation=vertical]/splitter:h-1.5 group-data-[orientation=vertical]/splitter:w-10",
  },
} as const satisfies Record<string, Record<SplitterSize, string>>;

/** One panel: its constraints for Ark and its content for the adapter. */
export interface SplitterPanelData {
  /** Identifies the panel. Handles are named `"<id>:<id>"` off their neighbours. */
  id: string;
  /** Panel text. Anything richer goes in as the panel's own children. */
  content?: string;
  /** The smallest share of the splitter this panel keeps. */
  minSize?: number | string;
  /** The largest share of the splitter this panel takes. */
  maxSize?: number | string;
  /** Whether the panel collapses to `collapsedSize`. */
  collapsible?: boolean;
  /** The share the panel keeps while collapsed. */
  collapsedSize?: number | string;
  /** Also disables the handles touching this panel. */
  disabled?: boolean;
}

/** Everything a Splitter panel accepts in both frameworks. */
export interface SplitterPanelProps {
  /** Identifies the panel. */
  id: string;
}

/** Everything a Splitter handle accepts in both frameworks. */
export interface SplitterResizeTriggerProps {
  /** The two panels it sits between, as `"<id>:<id>"`. */
  id: string;
  disabled?: boolean;
}

/**
 * Everything the Splitter root accepts in both frameworks.
 *
 * @remarks
 * Sizes are numbers for percentages and strings for pixels, which is Ark's own
 * vocabulary. The resize callbacks are not here: this package takes no Ark
 * dependency, so each adapter takes them from Ark's root instead.
 */
export interface SplitterRootProps {
  size?: SplitterSize;
  /** Which way the panels split. @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /** The panels to render, in order. Handles land between each pair. */
  panels?: SplitterPanelData[];
  /**
   * The panels' starting shares, as percentages.
   *
   * @remarks
   * Spelled in the plural because `size` is this library's design axis everywhere,
   * and Ark's own singular `size` is the controlled form of this array.
   */
  defaultSizes?: number[];
  /** The panels' controlled shares, as percentages. */
  sizes?: number[];
  /** How many pixels a handle moves per arrow key press. */
  keyboardResizeBy?: number;
}
