import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Main: the page's content region, sized to fill what the Header leaves.
 *
 * @remarks
 * The single class is the reason this component exists. A page whose content is shorter
 * than the viewport leaves the Footer floating in the middle of the screen unless
 * something claims the remaining height, and "the remaining height" is the viewport
 * less the Header — which is `--ui-header-height` and nothing the Main could measure.
 *
 * `dvh` rather than `vh`, so the region does not jump when a mobile browser's address
 * bar slides away. A page with no Header still works: the token is set either way, so
 * the Main is merely a little short rather than wrong.
 */
export const main = tv({
  slots: {
    base: "min-h-[calc(100dvh-var(--ui-header-height))]",
  },
});

export type MainVariants = VariantProps<typeof main>;
export type MainSlots = keyof ReturnType<typeof main>;

export type MainUI = TVSlot<MainSlots>;

export type MainTheme = ThemeOverride<MainSlots, MainVariants>;

/**
 * Everything a Main accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * The element is a `main`, which is the landmark a screen reader jumps to and the
 * reason this is a component rather than a class. There is one per page.
 */
export interface MainProps {
  /** Per-slot class overrides. */
  ui?: MainUI;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type MainVariantsAreExposed = MustBeNever<Exclude<keyof MainVariants, keyof MainProps>>;

declare global {
  interface Neo75ComponentThemes {
    main: ComponentContract<MainSlots, MainVariants>;
  }
}
