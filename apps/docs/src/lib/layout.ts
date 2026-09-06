/**
 * The Container's own measure and gutters, spelled out so the header rule, the columns
 * under it and any layout component the library ships all line up on the same two
 * edges. Copied from `packages/themes/src/components/container.ts` rather than invented.
 */
export const shell = "mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12";

/**
 * A column that stays put while the middle scrolls, and scrolls on its own. The offset
 * and the height are both the Header's height, which is `--ui-header-height` behind a
 * utility name, so a taller bar moves the columns with it.
 */
export const stickyColumn =
  "lg:sticky lg:top-header lg:h-[calc(100dvh-var(--ui-header-height))] lg:overflow-y-auto lg:overscroll-contain";
