import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Container: the measure every page's content is held to.
 *
 * @remarks
 * One slot and no variants, which is the whole point. A Container is a horizontal
 * constraint and a gutter, so every other layout component can be written without
 * repeating either. The Header and the Footer both render one, and a page body puts
 * one around its own content, so the three line up without any of them naming a width.
 *
 * The width is `max-w-page`, which is `--ui-container` behind a utility name, because a
 * site that wants a narrower measure changes one custom property and every Container
 * follows — including the ones inside the Header and the Footer that a caller never
 * renders itself. The gutters are the ones both apps in this repo already use.
 *
 * The gutter grows at two breakpoints so content clears the edge on a phone without
 * being pushed around on a wide screen.
 */
export const container = tv({
  slots: {
    base: "mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12",
  },
});

export type ContainerVariants = VariantProps<typeof container>;
export type ContainerSlots = keyof ReturnType<typeof container>;

export type ContainerUI = TVSlot<ContainerSlots>;

export type ContainerTheme = ThemeOverride<ContainerSlots, ContainerVariants>;

/**
 * Everything a Container accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @remarks
 * There is no `as` prop, and no other layout component here has one either. Nuxt UI
 * gives every layout component one because a Nuxt page is a tree of them and the
 * semantics have to be spelled somewhere; this library instead ships the elements that
 * carry the semantics — the Header renders a `header`, the Main a `main`, the Footer a
 * `footer` — so a Container is free to stay the `div` it always is.
 */
export interface ContainerProps {
  /** Per-slot class overrides. */
  ui?: ContainerUI;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ContainerVariantsAreExposed = MustBeNever<
  Exclude<keyof ContainerVariants, keyof ContainerProps>
>;

declare global {
  interface Neo75ComponentThemes {
    container: ComponentContract<ContainerSlots, ContainerVariants>;
  }
}
