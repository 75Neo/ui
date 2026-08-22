/**
 * Min-width breakpoints, which Panda turns into the `sm:`…`2xl:` conditions and a
 * matching `sizes.breakpoint-*` token for each.
 *
 * Mobile-first: the unprefixed value is the small-screen one and each breakpoint layers
 * over it. `sm` is 640px rather than a phone width on purpose — below it, layouts should
 * be single-column by default rather than by override.
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
