import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * The fallback sits under the image rather than beside it: Ark renders both and hides
 * the fallback once the image loads, so `base` carries the shape, the background and
 * the clipping, and `image` and `fallback` each fill it. Nothing here needs to know
 * which of the two is currently visible.
 *
 * `size` sets one box on `base` and the matching type scale on `fallback`, because
 * initials in a fixed type size stop fitting well below `md`.
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
 * Everything an Avatar accepts that is not framework-specific. `F` is however the
 * framework spells a fallback node: a `ReactNode` in React, a `Component` in Vue.
 *
 * The variant props are written out rather than derived from the recipe because
 * `@vue/compiler-sfc` resolves `defineProps` types from source alone: it cannot
 * evaluate the recipe's inferred type, so neither `VariantProps<typeof avatar>`
 * nor a mapped type over `avatar.variants` reaches Vue as finite keys.
 * `AvatarVariantsAreExposed` below closes the gap that leaves.
 */
export interface AvatarProps<F> {
  ui?: AvatarUI;
  size?: AvatarVariants["size"];
  shape?: AvatarVariants["shape"];
  src?: string;
  alt?: string;
  name?: string;
  fallback?: F | string;
}

/**
 * Compile-time guard: adding a variant to the recipe without adding the matching
 * prop above is a type error here rather than a prop that silently does nothing.
 */
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
 * One word → first two letters, two+ words → first + last initial.
 * Empty or whitespace-only names return "" so the caller can fall back to a
 * different rendering (e.g. an icon) rather than showing nothing.
 */
export function getAvatarInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
