import { byColor, componentColors, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Avatar styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * Ark renders the image over the fallback and hides it until it loads, so the root
 * carries the shape and the clipping while the two children simply fill it. `color`
 * only ever shows through the fallback, since an image covers it, and it is the
 * cheapest way to tell two sets of initials apart in a stack.
 *
 * The square shape tightens its corners at the small end: a `lg` radius on a 16px
 * box is a circle, so the shape stops reading.
 */

export type AvatarSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type AvatarShape = "circle" | "square";
export type AvatarColor = ComponentColor;

/** What the root publishes and every part reads. Lives in each adapter. */
export interface AvatarVariants {
  color: AvatarColor;
  size: AvatarSize;
  shape: AvatarShape;
}

export const avatarDefaults = { color: "neutral", size: "md", shape: "circle" } as const;

export const avatarSchema = {
  color: { values: componentColors, defaultValue: "neutral" },
  size: {
    values: ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
    defaultValue: "md",
  },
  shape: { values: ["circle", "square"], defaultValue: "circle" },
} as const satisfies ComponentSchema;

export const avatarParts = [
  { export: "Avatar", file: "avatar", contract: "AvatarRootProps" },
  { export: "AvatarImage", file: "image", contract: "AvatarImageProps" },
  { export: "AvatarFallback", file: "fallback", contract: "AvatarFallbackProps" },
] as const satisfies readonly ComponentPart[];

export const avatarSizeData = {
  root: {
    "3xs": "size-4",
    "2xs": "size-5",
    xs: "size-6",
    sm: "size-7",
    md: "size-8",
    lg: "size-10",
    xl: "size-12",
    "2xl": "size-14",
    "3xl": "size-16",
  },
  fallback: {
    "3xs": "text-[0.5rem]",
    "2xs": "text-[0.625rem]",
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
    "2xl": "text-xl",
    "3xl": "text-2xl",
  },
} as const satisfies Record<string, Record<AvatarSize, string>>;

export const avatarColorData = {
  root: {
    ...byColor((color) => `bg-${color}/10`),
    neutral: "bg-elevated",
  },
  fallback: {
    ...byColor((color) => `text-${color}`),
    neutral: "text-toned",
  },
} as const satisfies Record<string, Record<AvatarColor, string>>;

export const avatarShapeData = {
  root: {
    circle: "rounded-full",
    square: "rounded-lg",
  },
} as const satisfies Record<string, Record<AvatarShape, string>>;

/** One radius row, as `cva` compound variants read it. */
export interface AvatarRootCompound {
  shape?: AvatarShape;
  size?: AvatarSize;
  class: string;
}

/** A square avatar loses its corners below `lg`, so the small end steps down. */
export const avatarRootCompoundData: AvatarRootCompound[] = [
  { shape: "square", size: "3xs", class: "rounded-xs" },
  { shape: "square", size: "2xs", class: "rounded-sm" },
  { shape: "square", size: "xs", class: "rounded-sm" },
  { shape: "square", size: "sm", class: "rounded-md" },
  { shape: "square", size: "md", class: "rounded-md" },
];

/** Everything the Avatar root accepts in both frameworks. */
export interface AvatarRootProps {
  color?: AvatarColor;
  size?: AvatarSize;
  shape?: AvatarShape;
}

/** Everything an Avatar image accepts in both frameworks. */
export interface AvatarImageProps {
  src: string;
  alt?: string;
}

/** Everything an Avatar fallback accepts in both frameworks. */
export interface AvatarFallbackProps {
  /** Display name. Its initials show when the fallback has no content of its own. */
  name?: string;
}

/**
 * Derive initials from a display name.
 *
 * @param name - The display name, such as `"Ada Lovelace"`.
 * @returns One word gives its first two letters, several words give the first and
 * last initial, and a blank name gives `""` so the caller can render something else.
 *
 * @example
 * ```ts
 * getAvatarInitials("Ada Lovelace"); // "AL"
 * getAvatarInitials("Ada"); // "AD"
 * ```
 */
export function getAvatarInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
