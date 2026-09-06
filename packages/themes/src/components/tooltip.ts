import type { ComponentPart, ComponentSchema } from "../schema";
import type { Placement } from "../placement";

/**
 * Tooltip styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * The bubble fades and scales the way every other panel in the library does, from the
 * origin Zag writes on the positioner, so one pair of keyframes reads correctly from
 * all twelve placements: a bubble above its trigger grows downward, one below grows up.
 *
 * The arrow is two elements because the tip has to rotate inside a box that does not.
 * Ark reads the size and the background off CSS variables on the outer one, so those
 * two variables are the whole of the arrow's styling and the tip needs no classes.
 */

export type TooltipSize = "sm" | "md" | "lg";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface TooltipVariants {
  size: TooltipSize;
}

export const tooltipDefaults = { size: "md" } as const;

export const tooltipSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const tooltipParts = [
  { export: "Tooltip", file: "tooltip", contract: "TooltipRootProps" },
  { export: "TooltipTrigger", file: "trigger", contract: null },
  { export: "TooltipContent", file: "content", contract: "TooltipContentProps" },
  { export: "TooltipArrow", file: "arrow", contract: null },
] as const satisfies readonly ComponentPart[];

export const tooltipSizeData = {
  content: {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-1 text-xs",
    lg: "px-2.5 py-1.5 text-sm",
  },
} as const satisfies Record<string, Record<TooltipSize, string>>;

/** Everything a Tooltip bubble accepts in both frameworks. */
export interface TooltipContentProps {
  /** Fade and scale the bubble in and out. @defaultValue `true` */
  transition?: boolean;
}

/**
 * Everything the Tooltip root accepts in both frameworks.
 *
 * @remarks
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells
 * it `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * What the tooltip is attached to is the trigger's own children, handed to Ark with
 * `asChild` so the trigger is the caller's element rather than a button wrapping it.
 * That element has to be focusable, or the tooltip is reachable by pointer only.
 */
export interface TooltipRootProps {
  size?: TooltipSize;
  /** What the bubble says. */
  text?: string;
  /** Point a small triangle back at the trigger. @defaultValue `false` */
  arrow?: boolean;
  /** Which side of the trigger the bubble prefers. @defaultValue `"top"` */
  placement?: Placement;
  /** Gap in pixels between the trigger and the bubble. @defaultValue `8` */
  offset?: number;
  /** How long a pointer rests before the bubble appears. @defaultValue `400` */
  openDelay?: number;
  /** How long the bubble waits after the pointer leaves. @defaultValue `150` */
  closeDelay?: number;
  /** Keep the bubble open while the pointer is over it. @defaultValue `false` */
  interactive?: boolean;
  /** Stop the tooltip appearing at all, without removing it from the tree. */
  disabled?: boolean;
  /** Wait until first open to mount the bubble. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the bubble again on close. @defaultValue `false` */
  unmountOnExit?: boolean;
}
