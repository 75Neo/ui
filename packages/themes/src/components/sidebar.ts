import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Sidebar: a column beside the page that collapses, and slides in over
 * the page when there is no room beside it.
 *
 * @remarks
 * Two elements do the work and it is worth knowing which is which. `container` is the
 * sidebar people see and it is `fixed`, so a long body scrolls under a header that
 * stays put and the sidebar's own body scrolls independently. `gap` is an empty
 * spacer in normal flow whose only job is to be exactly as wide as the container, so
 * the page content beside it starts in the right place. Collapsing animates both, and
 * they have to agree or the content slides out from under the panel.
 *
 * There is one width, `--sidebar-width`, and one collapsed width, `--sidebar-width-icon`,
 * both declared on the root so a call-site `class` can redefine either without touching
 * the recipe. Every measurement below is one of those two.
 *
 * Below `lg` the spacer is hidden and the container is off-canvas unless it is open,
 * which is the whole of the mobile behaviour. Nuxt UI reaches for a Slideover there and
 * renders the sidebar's content a second time inside it; this one keeps a single tree
 * and moves it, so the body's scroll position and any open disclosure inside it survive
 * a viewport change. The cost is that the mobile panel is not a focus trap, which is
 * the trade a layout element can afford and a Dialog cannot.
 *
 * `collapsible: "none"` is the same tree with the spacer hidden and the panel put back
 * into flow: `relative` rather than `fixed`, and filling a root that now carries the
 * width itself. The offsets the side variant sets go along with that — `inset-s-0` on a
 * relative box moves it by nothing — so the border and the padding stay where they are
 * and no compound row is needed to put them back.
 */
export const sidebar = tv({
  slots: {
    base: "group/sidebar [--sidebar-width-icon:4rem] [--sidebar-width:16rem]",
    gap: "relative hidden w-(--sidebar-width) bg-transparent lg:block",
    container: "fixed inset-y-0 z-40 flex h-dvh w-(--sidebar-width)",
    inner: "flex size-full min-w-0 flex-col divide-y divide-default overflow-hidden bg-default",
    header: "flex min-h-header shrink-0 items-center gap-1.5 overflow-hidden px-4",
    wrapper: "min-w-0 flex-1",
    title: "truncate font-semibold text-highlighted",
    description: "truncate text-sm text-muted",
    actions: "flex shrink-0 items-center gap-1.5",
    close:
      "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
    body: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4",
    footer: "flex shrink-0 items-center gap-1.5 overflow-hidden p-4",
    rail: "absolute inset-y-0 z-20 hidden w-4 cursor-pointer after:absolute after:inset-y-0 after:inset-s-1/2 after:w-px hover:after:bg-accented lg:flex",
    overlay: "fixed inset-0 z-30 bg-inverted/40 backdrop-blur-[2px] lg:hidden",
  },
  variants: {
    /**
     * Which edge the sidebar is docked to. Declared before `variant` on purpose: the
     * floating and inset looks drop the border this sets, and a later variant is the
     * one tailwind-merge keeps.
     */
    side: {
      start: {
        container: "inset-s-0 border-e border-default",
        rail: "inset-e-0 translate-x-1/2 rtl:-translate-x-1/2",
      },
      end: {
        container: "inset-e-0 border-s border-default",
        rail: "inset-s-0 -translate-x-1/2 rtl:translate-x-1/2",
      },
    },
    /**
     * How the surface sits against the page. `sidebar` is flush against it, `floating`
     * lifts a rounded card off it, and `inset` insets the surface and drops the rules
     * between its regions for a quieter column.
     */
    variant: {
      sidebar: {},
      floating: {
        container: "border-transparent p-4",
        inner: "rounded-lg shadow-lg ring ring-default",
        rail: "inset-y-4",
      },
      inset: {
        container: "border-transparent py-4",
        inner: "divide-transparent",
        rail: "inset-y-4",
      },
    },
    /**
     * What collapsing means. `offcanvas` takes the whole column away, `icon` leaves a
     * strip wide enough for the icons in the body, and `none` never collapses and puts
     * the sidebar back in normal flow.
     */
    collapsible: {
      offcanvas: {
        gap: "data-[state=collapsed]:w-0",
      },
      icon: {
        gap: "data-[state=collapsed]:w-(--sidebar-width-icon)",
        container: "lg:data-[state=collapsed]:w-(--sidebar-width-icon)",
        actions: "group-data-[state=collapsed]/sidebar:hidden",
        body: "group-data-[state=collapsed]/sidebar:overflow-hidden",
      },
      none: {
        base: "w-(--sidebar-width) shrink-0",
        gap: "lg:hidden",
        container: "relative size-full",
      },
    },
    /**
     * Whether the spacer and the panel animate between the two widths. Off is what a
     * caller honouring `prefers-reduced-motion` at the application level wants, though
     * the classes below already stand down for it on their own.
     */
    transition: {
      true: {
        gap: "transition-[width] duration-200 ease-out motion-reduce:transition-none",
        container:
          "transition-[inset-inline-start,inset-inline-end,width] duration-200 ease-out motion-reduce:transition-none",
      },
      false: {},
    },
  },
  compoundVariants: [
    /*
     * Off-canvas at every width, then pulled back to the edge at `lg` for the icon
     * strip. Both rows are needed because the mobile behaviour is the same for the two
     * collapsible modes and only the desktop behaviour differs.
     */
    {
      side: "start",
      collapsible: ["offcanvas", "icon"],
      class: { container: "data-[state=collapsed]:-inset-s-(--sidebar-width)" },
    },
    {
      side: "end",
      collapsible: ["offcanvas", "icon"],
      class: { container: "data-[state=collapsed]:-inset-e-(--sidebar-width)" },
    },
    {
      side: "start",
      collapsible: "icon",
      class: { container: "lg:data-[state=collapsed]:inset-s-0" },
    },
    {
      side: "end",
      collapsible: "icon",
      class: { container: "lg:data-[state=collapsed]:inset-e-0" },
    },
    /* The floating card's own padding has to be inside both widths, not beside them. */
    {
      variant: "floating",
      collapsible: "icon",
      class: {
        gap: "data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+2rem)]",
        container: "lg:data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+2rem)]",
      },
    },
    { variant: "floating", side: "start", class: { rail: "inset-e-4" } },
    { variant: "floating", side: "end", class: { rail: "inset-s-4" } },
  ],
  defaultVariants: {
    side: "start",
    variant: "sidebar",
    collapsible: "offcanvas",
    transition: true,
  },
});

export type SidebarVariants = VariantProps<typeof sidebar>;
export type SidebarSlots = keyof ReturnType<typeof sidebar>;

export type SidebarUI = TVSlot<SidebarSlots>;

export type SidebarTheme = ThemeOverride<SidebarSlots, SidebarVariants>;

/** The two things a Sidebar can be, and what `data-state` says on the root. */
export type SidebarState = "expanded" | "collapsed";

/** The width below which the sidebar becomes a panel over the page. */
export const sidebarMobileQuery = "(max-width: 1023px)";

/**
 * Everything a Sidebar accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The header's title and description are props because they are strings; the body and
 * the footer are the caller's own markup and are spelled per framework.
 *
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells it
 * `v-model:open`, so each adapter takes it from its own state instead. Both treat the
 * two viewports as separate states behind that one name — collapsing on a wide screen
 * is a preference worth keeping, and a panel open over a phone's content is not — which
 * is the same split Nuxt UI makes and for the same reason.
 */
export interface SidebarProps<F> {
  /** Per-slot class overrides. */
  ui?: SidebarUI;
  side?: SidebarVariants["side"];
  variant?: SidebarVariants["variant"];
  collapsible?: SidebarVariants["collapsible"];
  transition?: SidebarVariants["transition"];
  /** Heads the sidebar, and truncates rather than wrapping. */
  title?: string;
  /** A quieter second line under the title. */
  description?: string;
  /**
   * Show the button that collapses the sidebar. It does nothing under
   * `collapsible: "none"`, so it is not drawn there.
   */
  close?: boolean;
  /** Replaces the close button's icon. */
  closeIcon?: F;
  /**
   * Draw the strip along the sidebar's outer edge that toggles it when clicked. It is
   * a wide hit area with a hairline in it, and appears only from `lg` up.
   */
  rail?: boolean;
  /** Draw the scrim behind the panel while it is open over a phone. @defaultValue `true` */
  overlay?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type SidebarVariantsAreExposed = MustBeNever<
  Exclude<keyof SidebarVariants, keyof SidebarProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    sidebar: ComponentContract<SidebarSlots, SidebarVariants>;
  }
}
