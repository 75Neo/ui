/**
 * Where a popup sits relative to the element it belongs to.
 *
 * @remarks
 * The twelve Ark understands, written out rather than imported from it, because Vue's
 * `defineProps` resolves types from source and cannot follow one into a dependency's
 * declaration files.
 *
 * It lives here rather than in the first component that needed it, because every
 * component built on a popper takes the same twelve: the Tooltip and the Popover today,
 * and the Menu and the Select as they land.
 */
export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";
