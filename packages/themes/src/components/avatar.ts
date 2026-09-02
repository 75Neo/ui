import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { byColor } from "../colors";

/**
 * Recipe for the Avatar: one box holding an image, with a fallback under it.
 *
 * @remarks
 * Ark renders both children and hides the fallback once the image loads, so `base`
 * carries the shape and the clipping while `image` and `fallback` simply fill it.
 * Nothing here has to know which of the two is showing.
 *
 * `color` only ever shows through the fallback, since an image covers it. It is the
 * cheapest way to tell two initials apart in a stack of them.
 *
 * `size` scales the fallback type alongside the box, because initials at a fixed size
 * stop fitting below `md`. The square shape tightens its corners at the small end for
 * the same reason: a `lg` radius on a 16px box is a circle.
 */
export const avatar = tv({
  slots: {
    base: "relative inline-flex shrink-0 items-center justify-center overflow-hidden align-middle select-none",
    fallback: "flex size-full items-center justify-center font-medium tracking-tight uppercase",
    image: "size-full object-cover",
  },
  variants: {
    color: {
      ...byColor((color) => ({
        base: `bg-${color}/10`,
        fallback: `text-${color}`,
      })),
      neutral: {
        base: "bg-elevated",
        fallback: "text-toned",
      },
    },
    size: {
      "3xs": { base: "size-4", fallback: "text-[0.5rem]" },
      "2xs": { base: "size-5", fallback: "text-[0.625rem]" },
      xs: { base: "size-6", fallback: "text-xs" },
      sm: { base: "size-7", fallback: "text-xs" },
      md: { base: "size-8", fallback: "text-sm" },
      lg: { base: "size-10", fallback: "text-base" },
      xl: { base: "size-12", fallback: "text-lg" },
      "2xl": { base: "size-14", fallback: "text-xl" },
      "3xl": { base: "size-16", fallback: "text-2xl" },
    },
    shape: {
      circle: { base: "rounded-full" },
      square: { base: "rounded-lg" },
    },
  },
  compoundVariants: [
    { shape: "square", size: "3xs", class: "rounded-xs" },
    { shape: "square", size: "2xs", class: "rounded-sm" },
    { shape: "square", size: "xs", class: "rounded-sm" },
    { shape: "square", size: "sm", class: "rounded-md" },
    { shape: "square", size: "md", class: "rounded-md" },
  ],
  defaultVariants: {
    color: "neutral",
    size: "md",
    shape: "circle",
  },
});

export type AvatarVariants = VariantProps<typeof avatar>;
export type AvatarSlots = keyof ReturnType<typeof avatar>;

export type AvatarUI = TVSlot<AvatarSlots>;

export type AvatarTheme = ThemeOverride<AvatarSlots, AvatarVariants>;

/**
 * Everything an Avatar accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells a renderable node: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface AvatarProps<F> {
  /** Per-slot class overrides. */
  ui?: AvatarUI;
  color?: AvatarVariants["color"];
  size?: AvatarVariants["size"];
  shape?: AvatarVariants["shape"];
  /** Image to show. Without one the avatar shows its fallback. */
  src?: string;
  alt?: string;
  /** Display name. Its initials are the default fallback. */
  name?: string;
  /** Shown until the image loads, and instead of it if there is none. */
  fallback?: F | string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type AvatarVariantsAreExposed = MustBeNever<
  Exclude<keyof AvatarVariants, keyof AvatarProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    avatar: ComponentContract<AvatarSlots, AvatarVariants>;
  }
}

/**
 * Derive initials from a display name.
 *
 * @param name - The display name, such as `"Ada Lovelace"`.
 * @returns One word gives its first two letters, several words give the first and last
 * initial, and a blank name gives `""` so the caller can render something else instead.
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
