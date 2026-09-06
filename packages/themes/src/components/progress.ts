import { byColor, componentColors, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Progress styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The circle's geometry is Ark's: the svg reads `--size` and `--thickness`, and the
 * range turns `--percent` into a dash offset. The size rows below only set those two
 * variables, so the ring scales without the adapters doing any maths.
 *
 * There is no `View` part. It renders its children when the bar is in a named
 * state, which is composition a caller writes with the state in hand, not data the
 * root owns.
 */

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressColor = ComponentColor;

export const progressDefaults = { size: "md", color: "primary" } as const;

export const progressSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
  color: { values: componentColors, defaultValue: "primary" },
} as const satisfies ComponentSchema;

export const progressParts = [
  { export: "Progress", file: "progress", contract: "ProgressRootProps" },
  { export: "ProgressLabel", file: "label", contract: null },
  { export: "ProgressValueText", file: "value-text", contract: null },
  { export: "ProgressTrack", file: "track", contract: null },
  { export: "ProgressRange", file: "range", contract: null },
  { export: "ProgressCircle", file: "circle", contract: null },
  { export: "ProgressCircleTrack", file: "circle-track", contract: null },
  { export: "ProgressCircleRange", file: "circle-range", contract: null },
] as const satisfies readonly ComponentPart[];

export const progressSizeData = {
  track: {
    sm: "h-1 data-[orientation=vertical]:h-32 data-[orientation=vertical]:w-1",
    md: "h-2 data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-2",
    lg: "h-3 data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-3",
  },
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  valueText: {
    sm: "text-xs tabular-nums",
    md: "text-sm tabular-nums",
    lg: "text-sm tabular-nums",
  },
  circle: {
    sm: "[--size:2rem] [--thickness:3px]",
    md: "[--size:2.5rem] [--thickness:4px]",
    lg: "[--size:3rem] [--thickness:5px]",
  },
} as const satisfies Record<string, Record<ProgressSize, string>>;

export const progressColorData = {
  range: {
    ...byColor((color) => `bg-${color}`),
    neutral: "bg-inverted",
  },
  circleRange: {
    ...byColor((color) => `stroke-${color}`),
    neutral: "stroke-inverted",
  },
} as const satisfies Record<string, Record<ProgressColor, string>>;

/**
 * Everything a Progress accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @remarks
 * The value state is not here: React spells it `value` with `onValueChange`, Vue
 * spells it `v-model:value`, so each adapter takes it from Ark's root instead. A
 * `null` value is the indeterminate bar, which sweeps rather than fills.
 */
export interface ProgressRootProps {
  size?: ProgressSize;
  color?: ProgressColor;
  /** Render the ring instead of the bar. @defaultValue `false` */
  circle?: boolean;
  /** The bar's heading. */
  label?: string;
  /** Show the formatted value beside the heading. @defaultValue `true` */
  showValue?: boolean;
  /** @defaultValue `0` */
  min?: number;
  /** @defaultValue `100` */
  max?: number;
  /** @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
}
