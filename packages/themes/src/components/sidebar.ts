import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Sidebar styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per part. Nothing here knows a framework.
 *
 * @remarks
 * Two elements do the work and it is worth knowing which is which. The panel is what
 * people see and it is fixed, so a long body scrolls under a header that stays put and
 * the sidebar's own body scrolls independently. The spacer is an empty box in normal
 * flow whose only job is to be exactly as wide as the panel, so the page content beside
 * it starts in the right place. Collapsing moves both, and they have to agree or the
 * content slides out from under the panel.
 *
 * There is one width and one collapsed width, both declared on the root, so a
 * call-site class can redefine either without touching anything here. Every
 * measurement below is one of those two.
 *
 * Below the wide breakpoint the spacer is hidden and the panel is off-canvas unless it
 * is open, which is the whole of the narrow behaviour. Nuxt UI reaches for a slideover
 * there and renders the sidebar's content a second time inside it; this one keeps a
 * single tree and moves it, so the body's scroll position and any open disclosure
 * inside it survive a viewport change. The cost is that the narrow panel is not a focus
 * trap, which is the trade a layout element can afford and a Dialog cannot.
 */

export type SidebarSide = "start" | "end";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";

/** The two things a Sidebar can be, and what the state attribute says on the root. */
export type SidebarState = "expanded" | "collapsed";

/** The width below which the sidebar becomes a panel over the page. */
export const sidebarMobileQuery = "(max-width: 1023px)";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface SidebarVariants {
  side: SidebarSide;
  variant: SidebarVariant;
  collapsible: SidebarCollapsible;
}

export const sidebarDefaults = {
  side: "start",
  variant: "sidebar",
  collapsible: "offcanvas",
} as const;

export const sidebarSchema = {
  side: { values: ["start", "end"], defaultValue: "start" },
  variant: { values: ["sidebar", "floating", "inset"], defaultValue: "sidebar" },
  collapsible: { values: ["offcanvas", "icon", "none"], defaultValue: "offcanvas" },
} as const satisfies ComponentSchema;

export const sidebarParts = [
  { export: "Sidebar", file: "sidebar", contract: "SidebarRootProps" },
  { export: "SidebarHeader", file: "header", contract: null },
  { export: "SidebarTitle", file: "title", contract: null },
  { export: "SidebarDescription", file: "description", contract: null },
  { export: "SidebarActions", file: "actions", contract: null },
  { export: "SidebarCloseTrigger", file: "close-trigger", contract: null },
  { export: "SidebarBody", file: "body", contract: null },
  { export: "SidebarFooter", file: "footer", contract: null },
  { export: "SidebarRail", file: "rail", contract: null },
] as const satisfies readonly ComponentPart[];

export const sidebarClasses = {
  root: "group/sidebar [--sidebar-width-icon:4rem] [--sidebar-width:16rem]",
  gap: "relative hidden w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-out motion-reduce:transition-none lg:block",
  panel:
    "fixed inset-y-0 z-40 flex h-dvh w-(--sidebar-width) transition-[inset-inline-start,inset-inline-end,width] duration-200 ease-out motion-reduce:transition-none",
  inner: "flex size-full min-w-0 flex-col divide-y divide-default overflow-hidden bg-default",
  header: "flex min-h-header shrink-0 items-center gap-1.5 overflow-hidden px-4",
  heading: "min-w-0 flex-1",
  title: "truncate font-semibold text-highlighted",
  description: "truncate text-sm text-muted",
  actions: "flex shrink-0 items-center gap-1.5",
  closeTrigger:
    "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  body: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4",
  footer: "flex shrink-0 items-center gap-1.5 overflow-hidden p-4",
  rail: "absolute inset-y-0 z-20 hidden w-4 cursor-pointer after:absolute after:inset-y-0 after:inset-s-1/2 after:w-px hover:after:bg-accented lg:flex",
  backdrop: "fixed inset-0 z-30 bg-inverted/40 backdrop-blur-[2px] lg:hidden",
} as const;

export const sidebarSideData = {
  panel: {
    start: "inset-s-0 border-e border-default",
    end: "inset-e-0 border-s border-default",
  },
  rail: {
    start: "inset-e-0 translate-x-1/2 rtl:-translate-x-1/2",
    end: "inset-s-0 -translate-x-1/2 rtl:translate-x-1/2",
  },
} as const satisfies Record<string, Record<SidebarSide, string>>;

export const sidebarVariantData = {
  panel: {
    sidebar: "",
    floating: "border-transparent p-4",
    inset: "border-transparent py-4",
  },
  inner: {
    sidebar: "",
    floating: "rounded-lg shadow-lg ring ring-default",
    inset: "divide-transparent",
  },
  rail: {
    sidebar: "",
    floating: "inset-y-4",
    inset: "inset-y-4",
  },
} as const satisfies Record<string, Record<SidebarVariant, string>>;

export const sidebarCollapsibleData = {
  root: {
    offcanvas: "",
    icon: "",
    none: "w-(--sidebar-width) shrink-0",
  },
  gap: {
    offcanvas: "data-[state=collapsed]:w-0",
    icon: "data-[state=collapsed]:w-(--sidebar-width-icon)",
    none: "lg:hidden",
  },
  panel: {
    offcanvas: "",
    icon: "lg:data-[state=collapsed]:w-(--sidebar-width-icon)",
    none: "relative size-full",
  },
  actions: {
    offcanvas: "",
    icon: "group-data-[state=collapsed]/sidebar:hidden",
    none: "",
  },
  body: {
    offcanvas: "",
    icon: "group-data-[state=collapsed]/sidebar:overflow-hidden",
    none: "",
  },
} as const satisfies Record<string, Record<SidebarCollapsible, string>>;

/** One geometry row, as `cva` compound variants read it. */
export interface SidebarPanelCompound {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible | SidebarCollapsible[];
  class: string;
}

/**
 * Off-canvas at every width, then pulled back to the edge at the wide breakpoint for
 * the icon strip. Both rows are needed because the narrow behaviour is the same for
 * the two collapsing modes and only the wide behaviour differs.
 */
export const sidebarPanelCompoundData: SidebarPanelCompound[] = [
  {
    side: "start",
    collapsible: ["offcanvas", "icon"],
    class: "data-[state=collapsed]:-inset-s-(--sidebar-width)",
  },
  {
    side: "end",
    collapsible: ["offcanvas", "icon"],
    class: "data-[state=collapsed]:-inset-e-(--sidebar-width)",
  },
  { side: "start", collapsible: "icon", class: "lg:data-[state=collapsed]:inset-s-0" },
  { side: "end", collapsible: "icon", class: "lg:data-[state=collapsed]:inset-e-0" },
  /* The floating card's own padding has to be inside the collapsed width, not beside it. */
  {
    variant: "floating",
    collapsible: "icon",
    class: "lg:data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+2rem)]",
  },
];

/** One geometry row for the spacer. */
export interface SidebarGapCompound {
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible | SidebarCollapsible[];
  class: string;
}

export const sidebarGapCompoundData: SidebarGapCompound[] = [
  {
    variant: "floating",
    collapsible: "icon",
    class: "data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+2rem)]",
  },
];

/** One geometry row for the rail. */
export interface SidebarRailCompound {
  side?: SidebarSide;
  variant?: SidebarVariant;
  class: string;
}

export const sidebarRailCompoundData: SidebarRailCompound[] = [
  { variant: "floating", side: "start", class: "inset-e-4" },
  { variant: "floating", side: "end", class: "inset-s-4" },
];

/**
 * Everything the Sidebar root accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells
 * it `v-model:open`, so each adapter keeps it itself. Both treat the two viewports as
 * separate states behind that one name — collapsing on a wide screen is a preference
 * worth keeping, and a panel open over a phone's content is not — which is the split
 * Nuxt UI makes and for the same reason.
 */
export interface SidebarRootProps<F> {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  /** Heads the sidebar, and truncates rather than wrapping. */
  title?: string;
  /** A quieter second line under the title. */
  description?: string;
  /**
   * Show the button that collapses the sidebar. It does nothing when the sidebar
   * never collapses, so it is not drawn there.
   */
  close?: boolean;
  /** Replaces the close button's icon. */
  closeIcon?: F;
  /**
   * Draw the strip along the sidebar's outer edge that toggles it when clicked. It is
   * a wide hit area with a hairline in it, and appears only on a wide viewport.
   */
  rail?: boolean;
  /** Draw the scrim behind the panel while it is open over a phone. @defaultValue `true` */
  overlay?: boolean;
}
