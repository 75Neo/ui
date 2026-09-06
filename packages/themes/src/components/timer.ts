import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Timer styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * There is no `color`. Digits are text, and the library spends a hue on things that
 * carry meaning; the action triggers wear the neutral outline button, repeated rather
 * than composed, because reaching into Button's classes would let either component
 * reshape the other.
 *
 * The digits read `tabular-nums` so a ticking seconds column does not shove its label
 * sideways twice a second.
 */

export type TimerSize = "sm" | "md" | "lg";

/** One unit of time the timer can show, spelling zag's `TimePart` by hand. */
export type TimerUnit = "days" | "hours" | "minutes" | "seconds" | "milliseconds";

/** What a timer's control buttons do, in the order they render. */
export type TimerAction = "start" | "pause" | "resume" | "reset";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface TimerVariants {
  size: TimerSize;
}

export const timerDefaults = { size: "md" } as const;

export const timerSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const timerParts = [
  { export: "Timer", file: "timer", contract: "TimerRootProps" },
  { export: "TimerArea", file: "area", contract: null },
  { export: "TimerItem", file: "item", contract: "TimerItemProps" },
  { export: "TimerSeparator", file: "separator", contract: null },
  { export: "TimerControl", file: "control", contract: null },
  { export: "TimerActionTrigger", file: "action-trigger", contract: "TimerActionTriggerProps" },
] as const satisfies readonly ComponentPart[];

/** The buttons under the digits, in order, with the text each one carries. */
export const timerActions = [
  { action: "start", label: "Start" },
  { action: "pause", label: "Pause" },
  { action: "resume", label: "Resume" },
  { action: "reset", label: "Reset" },
] as const satisfies readonly { action: TimerAction; label: string }[];

/** The units a bare timer shows. */
export const timerDefaultUnits = ["minutes", "seconds"] as const satisfies readonly TimerUnit[];

export const timerSizeData = {
  item: {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  },
  label: {
    sm: "text-[0.6875rem]",
    md: "text-xs",
    lg: "text-sm",
  },
  separator: {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  },
  actionTrigger: {
    sm: "gap-1 px-2 py-1 text-xs",
    md: "gap-1.5 px-2.5 py-1.5 text-xs",
    lg: "gap-1.5 px-3 py-2 text-sm",
  },
} as const satisfies Record<string, Record<TimerSize, string>>;

/** Everything a Timer digit accepts in both frameworks. */
export interface TimerItemProps {
  /** Which unit this column counts. */
  type: TimerUnit;
  /** The name under the digits. Falls back to the unit itself. */
  label?: string;
  /** Hide the name under the digits. */
  hideLabel?: boolean;
}

/** Everything a Timer button accepts in both frameworks. */
export interface TimerActionTriggerProps {
  /** What pressing it does. */
  action: TimerAction;
}

/**
 * Everything the Timer root accepts in both frameworks.
 *
 * @remarks
 * Which units render is data — the `units` array — so the digits, their labels and
 * the separators between them all come from one list, and a caller reorders the clock
 * by reordering it.
 */
export interface TimerRootProps {
  size?: TimerSize;
  /** The units to show, in order. @defaultValue `["minutes", "seconds"]` */
  units?: TimerUnit[];
  /** Show the unit names under the digits. @defaultValue `true` */
  showLabels?: boolean;
  /** Replaces a unit's name. Falls back to the unit itself. */
  labels?: Partial<Record<TimerUnit, string>>;
  /** The text between two units. @defaultValue `":"` */
  separator?: string;
  /** Show the start, pause, resume and reset buttons. @defaultValue `true` */
  controls?: boolean;
  /** Start ticking on mount. */
  autoStart?: boolean;
  /** Tick down towards zero instead of up towards the target. */
  countdown?: boolean;
  /** How often the timer updates, in milliseconds. @defaultValue `1000` */
  interval?: number;
  /** Where the timer starts, in milliseconds. */
  startMs?: number;
  /** Where the timer stops, in milliseconds. */
  targetMs?: number;
}
