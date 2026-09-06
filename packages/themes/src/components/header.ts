import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Header styling data: plain class strings both adapters feed into their own parts.
 * Nothing here knows a framework.
 *
 * @remarks
 * The height is `h-header`, the header token behind a utility name, and it is a token
 * because the Main and the Error subtract the same number from the viewport. A theme
 * that makes the bar taller has to move them with it, and only a token can.
 *
 * The row restates the Container's measure and gutters rather than rendering one.
 * Composing the component would be shorter and would put the container's part name on
 * the row instead of the header's, which is the identity every test selects on.
 *
 * The three regions divide the row rather than sharing it evenly: the two ends claim a
 * flex share and the centre takes what it needs, which is what centres a navigation
 * between a wordmark and a set of actions whatever their widths. Below the wide
 * breakpoint the centre is hidden and its content belongs in the menu instead.
 *
 * The menu is Ark's Dialog rather than this library's, because everything a Header
 * draws should be reachable through the header's own parts. Composing the Dialog
 * component would put half of the menu's appearance where a caller theming their
 * header would never look. Every one of the menu's parts is hidden at the wide
 * breakpoint, so a wide viewport never renders it even if it were left open.
 */

export type HeaderToggleSide = "start" | "end";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface HeaderVariants {
  toggleSide: HeaderToggleSide;
}

export const headerDefaults = { toggleSide: "end" } as const;

export const headerSchema = {
  toggleSide: { values: ["start", "end"], defaultValue: "end" },
} as const satisfies ComponentSchema;

export const headerParts = [
  { export: "Header", file: "header", contract: "HeaderRootProps" },
  { export: "HeaderRow", file: "row", contract: null },
  { export: "HeaderStart", file: "start", contract: null },
  { export: "HeaderCenter", file: "center", contract: null },
  { export: "HeaderEnd", file: "end", contract: null },
  { export: "HeaderTitle", file: "title", contract: "HeaderTitleProps" },
  { export: "HeaderToggle", file: "toggle", contract: null },
  { export: "HeaderMenu", file: "menu", contract: "HeaderMenuProps" },
] as const satisfies readonly ComponentPart[];

export const headerClasses = {
  root: "sticky top-0 z-50 h-header border-b border-default bg-default/75 backdrop-blur-sm",
  row: "mx-auto flex size-full max-w-page items-center justify-between gap-3 px-5 sm:px-8 lg:px-12",
  start: "flex items-center gap-1.5 lg:flex-1",
  center: "hidden lg:flex lg:items-center lg:gap-1.5",
  end: "flex items-center justify-end gap-1.5 lg:flex-1",
  title:
    "flex shrink-0 items-center gap-1.5 rounded-sm text-xl font-bold text-highlighted outline-primary/25 focus-visible:outline-3",
  toggle:
    "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 lg:hidden [&>svg]:size-full",
  backdrop: "fixed inset-0 bg-inverted/40 backdrop-blur-[2px] lg:hidden",
  positioner: "fixed inset-0 lg:hidden",
  menu: "flex h-dvh w-full flex-col bg-default outline-none",
  menuTitle: "sr-only",
  menuHeader: "flex h-header shrink-0 items-center justify-between gap-3 px-5 sm:px-8",
  menuBody: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-8",
} as const;

/**
 * The toggle's side pulls it into the gutter, so the icon's own edge lines up with the
 * text below it rather than its padding doing.
 */
export const headerToggleSideData = {
  toggle: {
    start: "-ms-1.5",
    end: "-me-1.5",
  },
} as const satisfies Record<string, Record<HeaderToggleSide, string>>;

/** Everything a Header wordmark accepts in both frameworks. */
export interface HeaderTitleProps {
  /** Makes the wordmark a link to this address. */
  href?: string;
}

/**
 * Everything a Header menu accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface HeaderMenuProps<F> {
  /** Draw the scrim behind the menu. @defaultValue `true` */
  overlay?: boolean;
  /** Move the menu to the end of the document. @defaultValue `true` */
  portal?: boolean;
  /** Replaces the icon that closes the menu. */
  closeIcon?: F;
  /** Names the menu for a screen reader. @defaultValue `"Menu"` */
  label?: string;
}

/**
 * Everything the Header root accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * `toggleSide` is start and end rather than left and right, because the bar mirrors
 * under a right-to-left locale and the button should mirror with it. Every other
 * direction-aware prop in the library reads the same way.
 *
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells
 * it `v-model:open`, so each adapter takes it from Ark's root instead.
 */
export interface HeaderRootProps<F> {
  toggleSide?: HeaderToggleSide;
  /** The wordmark at the start of the bar. */
  title?: string;
  /** Makes the wordmark a link to this address. */
  href?: string;
  /** Show the button that opens the menu on a narrow viewport. @defaultValue `true` */
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
