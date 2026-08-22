import { defineTokens } from "@pandacss/dev";
import { animations } from "./animations";
import { colors } from "./colors";

/**
 * The spacing ramp. One unit is 4px; the scale is linear to 4 and then opens up, which
 * keeps the small end (the range component padding actually lives in) fine-grained
 * without producing eighty tokens at the large end.
 *
 * Shared with `sizes` below so a height and a padding of the same number agree.
 * Panda mirrors every entry into a negative token automatically.
 */
const spacing = {
  0: { value: "0rem" },
  0.5: { value: "0.125rem" },
  1: { value: "0.25rem" },
  1.5: { value: "0.375rem" },
  2: { value: "0.5rem" },
  2.5: { value: "0.625rem" },
  3: { value: "0.75rem" },
  3.5: { value: "0.875rem" },
  4: { value: "1rem" },
  5: { value: "1.25rem" },
  6: { value: "1.5rem" },
  7: { value: "1.75rem" },
  8: { value: "2rem" },
  9: { value: "2.25rem" },
  10: { value: "2.5rem" },
  11: { value: "2.75rem" },
  12: { value: "3rem" },
  14: { value: "3.5rem" },
  16: { value: "4rem" },
  20: { value: "5rem" },
  24: { value: "6rem" },
  28: { value: "7rem" },
  32: { value: "8rem" },
  36: { value: "9rem" },
  40: { value: "10rem" },
  44: { value: "11rem" },
  48: { value: "12rem" },
  56: { value: "14rem" },
  64: { value: "16rem" },
  72: { value: "18rem" },
  80: { value: "20rem" },
  96: { value: "24rem" },
} as const;

/**
 * Raw, context-free values. Never reference these directly from a component — use the
 * semantic tokens instead, so light and dark stay automatic.
 *
 * The exception is the non-colour categories: `spacing`, `sizes`, `fontSizes` and friends
 * don't vary by colour mode, so components use them by name.
 */
export const tokens = defineTokens({
  colors,
  animations,
  spacing,

  sizes: {
    ...spacing,
    // Intrinsic keywords, so `w: "fit"` beats writing raw CSS.
    auto: { value: "auto" },
    full: { value: "100%" },
    min: { value: "min-content" },
    max: { value: "max-content" },
    fit: { value: "fit-content" },
    prose: { value: "65ch" },
    // Fractions for column layouts.
    "1/2": { value: "50%" },
    "1/3": { value: "33.333333%" },
    "2/3": { value: "66.666667%" },
    "1/4": { value: "25%" },
    "3/4": { value: "75%" },
    // Container widths, for panels and page shells.
    xs: { value: "20rem" },
    sm: { value: "24rem" },
    md: { value: "28rem" },
    lg: { value: "32rem" },
    xl: { value: "36rem" },
    "2xl": { value: "42rem" },
    "3xl": { value: "48rem" },
    "4xl": { value: "56rem" },
    "5xl": { value: "64rem" },
    "6xl": { value: "72rem" },
    "7xl": { value: "80rem" },
  },

  fonts: {
    sans: {
      value: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    serif: { value: "ui-serif, Georgia, Cambria, Times New Roman, serif" },
    mono: {
      value: "ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace",
    },
  },

  /**
   * `md` is the 1rem anchor rather than `base`, so the ramp reads the same way as every
   * other size scale in the system (`sm` < `md` < `lg`) and a component's `size` variant
   * can pass its own name straight through.
   */
  fontSizes: {
    "2xs": { value: "0.625rem" },
    xs: { value: "0.75rem" },
    sm: { value: "0.875rem" },
    md: { value: "1rem" },
    lg: { value: "1.125rem" },
    xl: { value: "1.25rem" },
    "2xl": { value: "1.5rem" },
    "3xl": { value: "1.875rem" },
    "4xl": { value: "2.25rem" },
    "5xl": { value: "3rem" },
    "6xl": { value: "3.75rem" },
    "7xl": { value: "4.5rem" },
  },

  fontWeights: {
    light: { value: "300" },
    normal: { value: "400" },
    medium: { value: "500" },
    semibold: { value: "600" },
    bold: { value: "700" },
  },

  lineHeights: {
    none: { value: "1" },
    tight: { value: "1.25" },
    snug: { value: "1.375" },
    normal: { value: "1.5" },
    relaxed: { value: "1.625" },
    loose: { value: "2" },
  },

  /** Larger text wants negative tracking; small caps-y labels want positive. */
  letterSpacings: {
    tighter: { value: "-0.05em" },
    tight: { value: "-0.025em" },
    normal: { value: "0em" },
    wide: { value: "0.025em" },
    wider: { value: "0.05em" },
    widest: { value: "0.1em" },
  },

  radii: {
    none: { value: "0" },
    xs: { value: "0.25rem" },
    sm: { value: "0.375rem" },
    md: { value: "0.5rem" },
    lg: { value: "0.75rem" },
    xl: { value: "1rem" },
    "2xl": { value: "1.5rem" },
    "3xl": { value: "2rem" },
    full: { value: "9999px" },
  },

  borderWidths: {
    none: { value: "0" },
    thin: { value: "1px" },
    thick: { value: "2px" },
    heavy: { value: "4px" },
  },

  durations: {
    fastest: { value: "60ms" },
    fast: { value: "120ms" },
    normal: { value: "200ms" },
    slow: { value: "320ms" },
    slowest: { value: "480ms" },
  },

  /**
   * `default` is the everyday curve. `emphasized` decelerates harder and is what
   * entrances (a popover opening) should use; `accelerate` is its exit counterpart.
   */
  easings: {
    default: { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
    linear: { value: "linear" },
    emphasized: { value: "cubic-bezier(0.05, 0.7, 0.1, 1)" },
    accelerate: { value: "cubic-bezier(0.3, 0, 0.8, 0.15)" },
    spring: { value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  },

  opacity: {
    0: { value: "0" },
    5: { value: "0.05" },
    10: { value: "0.1" },
    20: { value: "0.2" },
    40: { value: "0.4" },
    50: { value: "0.5" },
    60: { value: "0.6" },
    80: { value: "0.8" },
    100: { value: "1" },
  },

  blurs: {
    sm: { value: "4px" },
    md: { value: "8px" },
    lg: { value: "16px" },
    xl: { value: "24px" },
  },

  /**
   * Named layers, not magic numbers. Overlay-style components each get their own rung so
   * a toast is always above a modal and a tooltip is always above everything.
   */
  zIndex: {
    hide: { value: "-1" },
    base: { value: "0" },
    docked: { value: "10" },
    dropdown: { value: "1000" },
    sticky: { value: "1100" },
    banner: { value: "1200" },
    overlay: { value: "1300" },
    modal: { value: "1400" },
    popover: { value: "1500" },
    toast: { value: "1600" },
    tooltip: { value: "1700" },
  },

  aspectRatios: {
    square: { value: "1 / 1" },
    landscape: { value: "4 / 3" },
    portrait: { value: "3 / 4" },
    wide: { value: "16 / 9" },
    golden: { value: "1.618 / 1" },
  },
});
