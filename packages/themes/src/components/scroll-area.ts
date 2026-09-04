import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the ScrollArea: a scrollable region with styled scrollbars.
 *
 * @remarks
 * The viewport hides its native scrollbar — `scrollbar-width: none` and the
 * `::-webkit-scrollbar` rule Ark's own docs call required — and the styled scrollbar
 * takes its place. The scrollbar only shows while the pointer is over the region,
 * while it has focus within, or while it scrolls, which is what keeps a quiet page
 * quiet until the reader reaches for it.
 *
 * Orientation is not a variant. Ark writes `data-orientation` on the scrollbar, the
 * thumb and the corner, so one resolved class string covers every direction and the
 * component never re-resolves when it turns. The Accordion and the Tabs read their
 * orientation the same way.
 *
 * There is no `color` variant. A scrollbar carries no meaning; it carries the thumb.
 */
export const scrollArea = tv({
  slots: {
    base: "group/scroll-area relative min-w-0 overflow-hidden",
    viewport:
      "size-full scrollbar-none overflow-auto outline-primary/25 focus-visible:outline-3 [&::-webkit-scrollbar]:hidden",
    content: "min-w-0",
    scrollbar:
      "absolute touch-none rounded-full opacity-0 transition-opacity duration-150 select-none group-focus-within/scroll-area:opacity-100 group-hover/scroll-area:opacity-100 data-scrolling:opacity-100 data-[orientation=horizontal]:inset-x-2 data-[orientation=horizontal]:bottom-1 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:inset-y-2 data-[orientation=vertical]:right-1 data-[orientation=vertical]:flex-col",
    thumb:
      "relative flex-1 rounded-full bg-accented transition-colors hover:bg-inverted/30 data-dragging:bg-inverted/40",
    corner: "absolute right-1 bottom-1 rounded-full",
  },
  variants: {
    /** The scrollbar's thickness, and the corner that joins the two. */
    size: {
      sm: {
        scrollbar: "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
        corner: "size-1.5",
      },
      md: {
        scrollbar: "data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
        corner: "size-2",
      },
      lg: {
        scrollbar: "data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5",
        corner: "size-2.5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ScrollAreaVariants = VariantProps<typeof scrollArea>;
export type ScrollAreaSlots = keyof ReturnType<typeof scrollArea>;

export type ScrollAreaUI = TVSlot<ScrollAreaSlots>;

export type ScrollAreaTheme = ThemeOverride<ScrollAreaSlots, ScrollAreaVariants>;

/**
 * Everything a ScrollArea accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @remarks
 * The region's content is not here. It is whatever the framework calls children —
 * `children` in React, the default slot in Vue — because a scroll area usually holds
 * markup rather than a sentence, and a string prop would only get in the way.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface ScrollAreaProps {
  /** Per-slot class overrides. */
  ui?: ScrollAreaUI;
  size?: ScrollAreaVariants["size"];
  /** Which scrollbars are drawn. @defaultValue `"vertical"` */
  orientation?: "vertical" | "horizontal" | "both";
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ScrollAreaVariantsAreExposed = MustBeNever<
  Exclude<keyof ScrollAreaVariants, keyof ScrollAreaProps>
>;

declare global {
  interface Neo75ComponentThemes {
    scrollArea: ComponentContract<ScrollAreaSlots, ScrollAreaVariants>;
  }
}
