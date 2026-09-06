import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * DownloadTrigger styling data: plain class strings both adapters feed into their
 * own `cva` calls. Nothing here knows a framework.
 */

export type DownloadTriggerVariant = "solid" | "outline" | "soft" | "ghost";
export type DownloadTriggerColor = ComponentColor;
export type DownloadTriggerSize = "sm" | "md" | "lg";

export const downloadTriggerDefaults = { variant: "solid", color: "primary", size: "md" } as const;

export const downloadTriggerSchema = {
  variant: { values: ["solid", "outline", "soft", "ghost"], defaultValue: "solid" },
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const downloadTriggerParts = [
  { export: "DownloadTrigger", file: "download-trigger", contract: "DownloadTriggerProps" },
] as const satisfies readonly ComponentPart[];

export const downloadTriggerSizeData = {
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
} as const satisfies Record<string, Record<DownloadTriggerSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface DownloadTriggerBaseCompound {
  variant?: DownloadTriggerVariant;
  color?: DownloadTriggerColor;
  class: string;
}

export const downloadTriggerBaseCompoundData: DownloadTriggerBaseCompound[] = [
  ...eachColor((color) => ({
    color,
    variant: "solid" as const,
    class: `bg-${color} text-inverted outline-${color}/25 hover:bg-${color}/75 active:bg-${color}/75 disabled:bg-${color} aria-disabled:bg-${color}`,
  })),
  ...eachColor((color) => ({
    color,
    variant: "outline" as const,
    class: `text-${color} ring ring-${color}/50 outline-${color}/25 ring-inset hover:bg-${color}/10 focus-visible:ring-${color} active:bg-${color}/10`,
  })),
  ...eachColor((color) => ({
    color,
    variant: "soft" as const,
    class: `bg-${color}/10 text-${color} outline-${color}/25 hover:bg-${color}/15 active:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10`,
  })),
  ...eachColor((color) => ({
    color,
    variant: "ghost" as const,
    class: `text-${color} outline-${color}/25 hover:bg-${color}/10 active:bg-${color}/10`,
  })),
  {
    color: "neutral",
    variant: "solid",
    class:
      "bg-inverted text-inverted outline-inverted/25 hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted",
  },
  {
    color: "neutral",
    variant: "outline",
    class:
      "bg-default text-default ring ring-accented outline-inverted/25 ring-inset hover:bg-elevated focus-visible:ring-inverted active:bg-elevated",
  },
  {
    color: "neutral",
    variant: "soft",
    class:
      "bg-elevated text-default outline-inverted/25 hover:bg-accented/75 active:bg-accented/75",
  },
  {
    color: "neutral",
    variant: "ghost",
    class: "text-default outline-inverted/25 hover:bg-elevated active:bg-elevated",
  },
];

/** What to download. Structural: `Blob` and `File` satisfy it wherever the DOM exists. */
export interface DownloadDataInput {
  arrayBuffer(): Promise<ArrayBuffer>;
  readonly size: number;
  readonly type: string;
}

/**
 * Everything a DownloadTrigger accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The contract spells blobs structurally because `@75neo/themes` typechecks without
 * the DOM library; a real `Blob` or `File` satisfies both spellings.
 */
export interface DownloadTriggerProps<F> {
  variant?: DownloadTriggerVariant;
  color?: DownloadTriggerColor;
  size?: DownloadTriggerSize;
  data: DownloadDataInput;
  fileName: string;
  mimeType: string;
  leadingIcon?: F;
  trailingIcon?: F;
  disabled?: boolean;
}
