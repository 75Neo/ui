import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * SegmentGroup styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type SegmentGroupColor = ComponentColor;
export type SegmentGroupSize = "sm" | "md" | "lg";
export type SegmentGroupOrientation = "horizontal" | "vertical";

export const segmentGroupDefaults = {
  color: "primary",
  size: "md",
  orientation: "horizontal",
} as const;

export const segmentGroupSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
  orientation: { values: ["horizontal", "vertical"], defaultValue: "horizontal" },
} as const satisfies ComponentSchema;

export const segmentGroupParts = [
  { export: "SegmentGroup", file: "segment-group", contract: "SegmentGroupRootProps" },
  { export: "SegmentGroupIndicator", file: "indicator", contract: null },
  { export: "SegmentGroupItem", file: "item", contract: "SegmentGroupItemProps" },
  { export: "SegmentGroupItemText", file: "item-text", contract: null },
] as const satisfies readonly ComponentPart[];

export const segmentGroupSizeData = {
  base: {
    sm: "gap-0.5 p-0.5",
    md: "gap-1 p-1",
    lg: "gap-1 p-1",
  },
  item: {
    sm: "h-6 px-2 text-xs",
    md: "h-7 px-3 text-sm",
    lg: "h-9 px-4 text-sm",
  },
} as const satisfies Record<string, Record<SegmentGroupSize, string>>;

export const segmentGroupOrientationData = {
  base: {
    horizontal: "flex-row items-center",
    vertical: "flex-col items-stretch",
  },
  item: {
    horizontal: "",
    vertical: "justify-start",
  },
} as const satisfies Record<string, Record<SegmentGroupOrientation, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface SegmentGroupItemCompound {
  color?: SegmentGroupColor;
  class: string;
}

export const segmentGroupItemCompoundData: SegmentGroupItemCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `data-[state=checked]:text-${color}`,
  })),
  { color: "neutral", class: "data-[state=checked]:text-highlighted" },
];

/**
 * One segment.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface SegmentGroupOption<F> {
  /** Submitted when this segment is picked. */
  value: string;
  /** What the segment says. */
  label: string;
  disabled?: boolean;
  /** Icon before the label. */
  icon?: F;
}

/**
 * Everything a SegmentGroup accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The selection is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead.
 */
export interface SegmentGroupRootProps<F> {
  color?: SegmentGroupColor;
  size?: SegmentGroupSize;
  orientation?: SegmentGroupOrientation;
  /** The segments to offer. */
  items: SegmentGroupOption<F>[];
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the choice under this name inside a form. */
  name?: string;
}

/**
 * One segment, for custom composition.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface SegmentGroupItemProps<F> {
  /** The segment this row draws. */
  item: SegmentGroupOption<F>;
  /** Replaces this segment's icon. Falls back to the option's own. */
  leadingIcon?: F;
}
