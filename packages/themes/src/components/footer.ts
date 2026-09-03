import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Footer: the three-region strip along the bottom of a page.
 *
 * @remarks
 * `container` restates the Container's measure and gutters rather than rendering one,
 * for the reason the Header does: composing the component would put `data-slot="base"`
 * on the row instead of `data-slot="container"`, and slot-name identity is what every
 * test and every `ui` override in the library selects on. `max-w-page` is
 * `--ui-container` behind a utility name, so the Footer, the Header and a Container
 * around the page body all still move together.
 *
 * The three regions are written into the DOM in the order right, center, left and put
 * back in reading order by `lg:order-*`. That is deliberate rather than an accident of
 * the flex direction: stacked on a phone the links people came for should be above the
 * copyright, and reversing the source is the only way to get that without duplicating
 * the markup. Reading order is restored the moment there is a row to sit in.
 *
 * `top` and `bottom` are full-bleed and unpadded horizontally, so a caller can put a
 * newsletter band or a wide grid of columns there and let it run to the edge.
 */
export const footer = tv({
  slots: {
    base: "",
    top: "py-8 lg:py-12",
    container:
      "mx-auto w-full max-w-page px-5 py-8 sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-x-3 lg:px-12 lg:py-4",
    left: "mt-3 flex items-center justify-center gap-x-1.5 text-sm text-muted lg:order-1 lg:mt-0 lg:flex-1 lg:justify-start",
    center: "mt-3 flex items-center justify-center lg:order-2 lg:mt-0",
    right: "flex items-center justify-center gap-x-1.5 lg:order-3 lg:flex-1 lg:justify-end",
    bottom: "py-8 lg:py-12",
  },
});

export type FooterVariants = VariantProps<typeof footer>;
export type FooterSlots = keyof ReturnType<typeof footer>;

export type FooterUI = TVSlot<FooterSlots>;

export type FooterTheme = ThemeOverride<FooterSlots, FooterVariants>;

/**
 * Everything a Footer accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * Every region is content the caller owns, so this contract carries no content props at
 * all — the adapters spell the five regions as `ReactNode` props and as named slots.
 * The `top` and `bottom` bands render only when something is put in them, so the plain
 * case is a single row and nothing else.
 */
export interface FooterProps {
  /** Per-slot class overrides. */
  ui?: FooterUI;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type FooterVariantsAreExposed = MustBeNever<
  Exclude<keyof FooterVariants, keyof FooterProps>
>;

declare global {
  interface Neo75ComponentThemes {
    footer: ComponentContract<FooterSlots, FooterVariants>;
  }
}
