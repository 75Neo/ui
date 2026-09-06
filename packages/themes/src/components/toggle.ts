import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Toggle styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * A toggle is a button that stays pressed: five variants across seven colors, and
 * the pressed state in every cell. The default variant is `soft`, not `solid` — an
 * unpressed toggle should not shout.
 */

export type ToggleVariant = "solid" | "outline" | "soft" | "subtle" | "ghost";
export type ToggleColor = ComponentColor;
export type ToggleSize = "sm" | "md" | "lg";

export const toggleDefaults = { variant: "soft", color: "primary", size: "md" } as const;

export const toggleSchema = {
  variant: { values: ["solid", "outline", "soft", "subtle", "ghost"], defaultValue: "soft" },
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const toggleParts = [
  { export: "Toggle", file: "toggle", contract: "ToggleProps" },
] as const satisfies readonly ComponentPart[];

export const toggleSizeData = {
  base: {
    sm: "gap-1.5 px-2.5 py-1.5 text-xs",
    md: "gap-1.5 px-2.5 py-1.5 text-sm",
    lg: "gap-2 px-3 py-2 text-sm",
  },
  leadingIcon: {
    sm: "size-4",
    md: "size-5",
    lg: "size-5",
  },
  trailingIcon: {
    sm: "size-4",
    md: "size-5",
    lg: "size-5",
  },
} as const satisfies Record<string, Record<ToggleSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface ToggleBaseCompound {
  variant?: ToggleVariant;
  color?: ToggleColor;
  class: string;
}

export const toggleBaseCompoundData: ToggleBaseCompound[] = [
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
 * Everything a Toggle accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The pressed state is not here: React spells it `pressed` with `onPressedChange`,
 * Vue spells it `v-model:pressed`, so each adapter takes it from Ark's root instead.
 */
export interface ToggleProps<F> {
  variant?: ToggleVariant;
  color?: ToggleColor;
  size?: ToggleSize;
  leadingIcon?: F;
  trailingIcon?: F;
  disabled?: boolean;
}
