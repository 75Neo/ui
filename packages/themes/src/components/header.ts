import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Header: the bar across the top of a page, and the menu it opens on a
 * phone.
 *
 * @remarks
 * The height is `h-header`, which is `--ui-header-height` behind a utility name, and it
 * is a token because the Main and the Error subtract the same number from the viewport.
 * A theme that makes the bar taller has to move them with it, and only a token can.
 *
 * `container` restates the Container's measure and gutters rather than rendering one.
 * Composing the component would have been shorter, and would have put `data-slot="base"`
 * on the row instead of `data-slot="container"` — the slot-name identity every test and
 * every `ui` override in the library depends on. Five utilities repeated here and in the
 * Footer is the cheaper of the two prices. `max-w-page` is `--ui-container` behind a
 * utility name, so all three still move together.
 *
 * The three regions divide the row rather than sharing it evenly: `left` and `right`
 * both claim `lg:flex-1` and the center takes what it needs, which is what centres a
 * navigation between a logo and a set of actions whatever their widths. Below `lg` the
 * center is hidden outright and its content belongs in the menu instead.
 *
 * The menu is Ark's Dialog rather than this library's, because everything a Header
 * draws should be reachable through the `header` key. Composing the Dialog component
 * would have put half of the menu's appearance behind `dialog` instead, where a caller
 * theming their header would not think to look. It is styled from `overlay` down to
 * `menuBody` here, and every one of those slots is hidden at `lg` so a wide viewport
 * never renders it even if it were somehow left open.
 */
export const header = tv({
  slots: {
    base: "sticky top-0 z-50 h-header border-b border-default bg-default/75 backdrop-blur-sm",
    container:
      "mx-auto flex size-full max-w-page items-center justify-between gap-3 px-5 sm:px-8 lg:px-12",
    left: "flex items-center gap-1.5 lg:flex-1",
    center: "hidden lg:flex lg:items-center lg:gap-1.5",
    right: "flex items-center justify-end gap-1.5 lg:flex-1",
    title:
      "flex shrink-0 items-center gap-1.5 rounded-sm text-xl font-bold text-highlighted outline-primary/25 focus-visible:outline-3",
    toggle:
      "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 lg:hidden [&>svg]:size-full",
    overlay: "fixed inset-0 bg-inverted/40 backdrop-blur-[2px] lg:hidden",
    positioner: "fixed inset-0 lg:hidden",
    menu: "flex h-dvh w-full flex-col bg-default outline-none",
    menuTitle: "sr-only",
    menuHeader: "flex h-header shrink-0 items-center justify-between gap-3 px-5 sm:px-8",
    menuBody: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-8",
  },
  variants: {
    /**
     * Which end of the bar the menu button sits at. It is pulled into the gutter either
     * way, so the icon's own edge lines up with the text below it rather than its
     * padding doing.
     */
    toggleSide: {
      start: { toggle: "-ms-1.5" },
      end: { toggle: "-me-1.5" },
    },
  },
  defaultVariants: {
    toggleSide: "end",
  },
});

export type HeaderVariants = VariantProps<typeof header>;
export type HeaderSlots = keyof ReturnType<typeof header>;

export type HeaderUI = TVSlot<HeaderSlots>;

export type HeaderTheme = ThemeOverride<HeaderSlots, HeaderVariants>;

/**
 * Everything a Header accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The regions are content the caller owns and are spelled per framework, as `ReactNode`
 * props and as named slots. What is here is the title, which is a string often enough
 * to be worth a prop, and the handful of switches that decide whether there is a menu
 * at all.
 *
 * `toggleSide` is `start`/`end` rather than `left`/`right` because the bar mirrors
 * under a right-to-left locale and the button should mirror with it. Every other
 * direction-aware prop in the library reads the same way.
 *
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells it
 * `v-model:open`, so each adapter takes it from Ark's root instead.
 */
export interface HeaderProps<F> {
  /** Per-slot class overrides. */
  ui?: HeaderUI;
  toggleSide?: HeaderVariants["toggleSide"];
  /**
   * The wordmark at the start of the bar. Rendered inside `to`'s link when there is
   * one, and as plain text otherwise.
   */
  title?: string;
  /** Makes the title a link to this address. */
  to?: string;
  /**
   * Show the button that opens the menu below `lg`.
   *
   * @defaultValue `true`
   */
  toggle?: boolean;
  /** Replaces the icon shown while the menu is closed. */
  toggleIcon?: F;
  /** Replaces the icon shown while the menu is open. */
  toggleCloseIcon?: F;
  /** Draw the scrim behind the menu. @defaultValue `true` */
  overlay?: boolean;
  /** Move the menu to the end of the document. @defaultValue `true` */
  portal?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type HeaderVariantsAreExposed = MustBeNever<
  Exclude<keyof HeaderVariants, keyof HeaderProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    header: ComponentContract<HeaderSlots, HeaderVariants>;
  }
}
