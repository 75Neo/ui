import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * RatingGroup styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * A half star is the same star clipped to half width — the same shape cut down the
 * middle — rather than a different icon. The clip runs from the inline start, so
 * under a right-to-left locale a half star fills from the right.
 */

export type RatingGroupColor = ComponentColor;
export type RatingGroupSize = "sm" | "md" | "lg";

/** How much of a star is filled. */
export type RatingFill = "empty" | "half" | "full";

export const ratingGroupDefaults = { color: "primary", size: "md" } as const;

export const ratingGroupSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const ratingGroupParts = [
  { export: "RatingGroup", file: "rating-group", contract: "RatingGroupRootProps" },
  { export: "RatingGroupLabel", file: "label", contract: null },
  { export: "RatingGroupControl", file: "control", contract: null },
  { export: "RatingGroupItem", file: "item", contract: null },
] as const satisfies readonly ComponentPart[];

export const ratingGroupSizeData = {
  label: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  control: {
    sm: "gap-0.5",
    md: "gap-1",
    lg: "gap-1",
  },
  item: {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  },
  icon: {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  },
} as const satisfies Record<string, Record<RatingGroupSize, string>>;

/** One colour row, as `cva` compound variants read it. The fill, not the star. */
export interface RatingGroupFillCompound {
  color?: RatingGroupColor;
  class: string;
}

export const ratingGroupFillCompoundData: RatingGroupFillCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `text-${color}`,
  })),
  { color: "neutral", class: "text-highlighted" },
];

/**
 * How much of a star is filled, from Ark's reading of the value.
 *
 * @param highlighted - Whether the star is at or under the current value.
 * @param half - Whether Ark counts this star as the half one.
 * @returns The fill the overlay span spends.
 *
 * @remarks
 * Lives here rather than in either adapter because both need exactly this rule, and
 * a row whose React and Vue halves disagreed about when a star is half full would be
 * two components.
 */
export function ratingFill(highlighted: boolean, half: boolean): RatingFill {
  if (!highlighted) return "empty";
  if (half) return "half";
  return "full";
}

/**
 * Everything a RatingGroup accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The value is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. It is a number in
 * both, possibly fractional when halves are allowed.
 */
export interface RatingGroupRootProps<F> {
  color?: RatingGroupColor;
  size?: RatingGroupSize;
  /** How many stars to draw. @defaultValue `5` */
  count?: number;
  /** Caption above the row. */
  label?: string;
  /** Let a star split in two. */
  allowHalf?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /** Submits the value under this name inside a form. */
  name?: string;
  /** Replaces the star. */
  icon?: F;
}
