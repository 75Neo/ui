/**
 * The chrome's controls, written in the library's own vocabulary.
 *
 * @remarks
 * The header bar, the search dialog and the two menus are native markup, because they
 * stand in chrome both framework routes share and either adapter's component would be
 * the wrong one on half the site. That is a reason to hand-write the elements, not a
 * licence to invent a second appearance for them: every string here is copied from the
 * recipe the library would have rendered: `menu.ts` for the panel and its rows,
 * `header.ts` for the icon button.
 */

/** A square icon button in the bar. The Header's own `toggle` slot. */
export const iconButton =
  "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-1.5 text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full";

/** Anything that floats over the page: the Menu recipe's `base` slot, plus its padding. */
export const panel = "rounded-md bg-default p-1 shadow-lg ring ring-accented";

/** One row inside that panel: the Menu recipe's `item` slot at `size="md"`. */
export const panelItem =
  "flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-toned no-underline outline-none select-none hover:bg-elevated hover:text-highlighted";

/** A key cap, for the shortcuts the bar advertises. */
export const kbd =
  "rounded-sm bg-elevated px-1.5 py-0.5 font-mono text-[0.6875rem] leading-none text-dimmed";
