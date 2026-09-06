import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * ToggleGroup styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type ToggleGroupVariant = "solid" | "outline" | "soft" | "subtle" | "ghost";
export type ToggleGroupColor = ComponentColor;
export type ToggleGroupSize = "sm" | "md" | "lg";
export type ToggleGroupOrientation = "horizontal" | "vertical";

export const toggleGroupDefaults = {
  variant: "soft",
  color: "primary",
  size: "md",
  orientation: "horizontal",
} as const;

export const toggleGroupSchema = {
  variant: { values: ["solid", "outline", "soft", "subtle", "ghost"], defaultValue: "soft" },
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
  orientation: { values: ["horizontal", "vertical"], defaultValue: "horizontal" },
} as const satisfies ComponentSchema;

export const toggleGroupParts = [
  { export: "ToggleGroup", file: "toggle-group", contract: "ToggleGroupRootProps" },
  { export: "ToggleGroupItem", file: "item", contract: "ToggleGroupItemProps" },
  { export: "ToggleGroupItemText", file: "item-text", contract: null },
] as const satisfies readonly ComponentPart[];

export const toggleGroupSizeData = {
  item: {
    sm: "gap-1.5 px-2.5 py-1.5 text-xs",
    md: "gap-1.5 px-2.5 py-1.5 text-sm",
    lg: "gap-2 px-3 py-2 text-sm",
  },
  leadingIcon: {
    sm: "size-4",
    md: "size-5",
    lg: "size-5",
  },
} as const satisfies Record<string, Record<ToggleGroupSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface ToggleGroupItemCompound {
  variant?: ToggleGroupVariant;
  color?: ToggleGroupColor;
  class: string;
}

export const toggleGroupItemCompoundData: ToggleGroupItemCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `outline-${color}/25`,
  })),
  { color: "neutral", class: "outline-inverted/25" },
  ...eachColor((color) => ({
    color,
    variant: "solid" as const,
    class: `bg-elevated text-default hover:bg-accented data-pressed:bg-${color} data-pressed:text-inverted`,
  })),
  {
    color: "neutral",
    variant: "solid",
    class:
      "bg-elevated text-default hover:bg-accented data-pressed:bg-inverted data-pressed:text-inverted",
  },
  ...eachColor((color) => ({
    color,
    variant: "outline" as const,
    class: `text-toned ring ring-accented ring-inset hover:bg-elevated hover:text-highlighted data-pressed:bg-${color}/10 data-pressed:text-${color}`,
  })),
  {
    color: "neutral",
    variant: "outline",
    class:
      "text-toned ring ring-accented ring-inset hover:bg-elevated hover:text-highlighted data-pressed:bg-elevated data-pressed:text-highlighted",
  },
  ...eachColor((color) => ({
    color,
    variant: "soft" as const,
    class: `bg-muted text-toned hover:bg-accented/60 data-pressed:bg-${color}/10 data-pressed:text-${color}`,
  })),
  {
    color: "neutral",
    variant: "soft",
    class:
      "bg-muted text-default hover:bg-accented/60 data-pressed:bg-accented data-pressed:text-highlighted",
  },
  ...eachColor((color) => ({
    color,
    variant: "subtle" as const,
    class: `bg-muted text-toned ring ring-accented ring-inset hover:bg-accented/60 data-pressed:bg-${color}/10 data-pressed:text-${color} data-pressed:ring-transparent`,
  })),
  {
    color: "neutral",
    variant: "subtle",
    class:
      "bg-muted text-default ring ring-accented ring-inset hover:bg-accented/60 data-pressed:bg-accented data-pressed:text-highlighted data-pressed:ring-transparent",
  },
  ...eachColor((color) => ({
    color,
    variant: "ghost" as const,
    class: `text-toned hover:bg-elevated hover:text-highlighted data-pressed:bg-${color}/10 data-pressed:text-${color}`,
  })),
  {
    color: "neutral",
    variant: "ghost",
    class:
      "text-toned hover:bg-elevated hover:text-highlighted data-pressed:bg-elevated data-pressed:text-highlighted",
  },
];

/**
 * One toggle in the group.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface ToggleGroupOption<F> {
  /** Identifies the item. Submitted when the item is pressed. */
  value: string;
  /** What the item says. An item with no label and no icon is an empty button. */
  label?: string;
  /** Icon shown before the label. */
  icon?: F;
  disabled?: boolean;
}

/**
 * Everything a ToggleGroup accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The pressed values are not here: React spells them `value` with `onValueChange`,
 * Vue spells them `v-model`, so each adapter takes them from Ark's root instead.
 */
export interface ToggleGroupRootProps<F> {
  variant?: ToggleGroupVariant;
  color?: ToggleGroupColor;
  size?: ToggleGroupSize;
  /** Which way the items run. @defaultValue `"horizontal"` */
  orientation?: ToggleGroupOrientation;
  /** The toggles to offer, in order. */
  items: ToggleGroupOption<F>[];
  /** Whether several items may be pressed at once. @defaultValue `false` */
  multiple?: boolean;
  /**
   * Whether a pressed item can be pressed again to release it.
   * Ignored while `multiple` is on. @defaultValue `true`
   */
  deselectable?: boolean;
  disabled?: boolean;
}

/**
 * One toggle, for custom composition.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface ToggleGroupItemProps<F> {
  /** The toggle this row draws. */
  item: ToggleGroupOption<F>;
  /** Replaces this toggle's icon. Falls back to the option's own. */
  leadingIcon?: F;
}
