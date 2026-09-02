import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Avatar: one box holding an image, with a fallback under it.
 *
 * @remarks
 * Ark renders both children and hides the fallback once the image loads, so `base`
 * carries the shape and the clipping while `image` and `fallback` simply fill it.
 * Nothing here has to know which of the two is showing. `size` also scales the fallback
 * type, because initials at a fixed size stop fitting below `md`.
 */
export const avatar = tv({
  slots: {
    base: "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-muted align-middle select-none",
    fallback:
      "flex size-full items-center justify-center font-medium tracking-tight text-muted uppercase",
    image: "size-full object-cover",
  },
  variants: {
    size: {
      xs: {
        base: "size-6",
        fallback: "text-[10px]",
      },
      sm: {
        base: "size-8",
        fallback: "text-xs",
      },
      md: {
        base: "size-10",
        fallback: "text-sm",
      },
      lg: {
        base: "size-12",
        fallback: "text-base",
      },
      xl: {
        base: "size-16",
        fallback: "text-lg",
      },
      "2xl": {
        base: "size-20",
        fallback: "text-xl",
      },
    },
    shape: {
      circle: {
        base: "rounded-full",
      },
      square: {
        base: "rounded-lg",
      },
    },
  },
  defaultVariants: {
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
