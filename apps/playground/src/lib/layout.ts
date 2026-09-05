/**
 * The page gutter, shared by the header and the columns under it so the header rule and
 * the shell line up on the same two edges.
 */
export const shell = "mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8";

/** A column that stays put while the middle scrolls, and scrolls on its own. */
export const stickyColumn =
  "lg:sticky lg:top-14 lg:h-[calc(100dvh-3.5rem)] lg:overflow-y-auto lg:overscroll-contain";
