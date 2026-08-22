import { defineTokens } from "@pandacss/dev";

/**
 * The raw palettes. Eleven steps each, in the same shape, so a semantic token can move
 * between hues without changing which step it points at.
 *
 * Read the steps as roles rather than shades: 50–100 are tinted backgrounds, 200–300 are
 * borders, 500–600 are solid fills, 700–800 are text on a tinted background, and 950 is
 * the tinted background's dark-mode counterpart.
 *
 * Nothing outside `semantic-tokens.ts` should import from here. A component that reaches
 * for `neo.600` has hard-coded a light-mode value; the semantic layer exists so it
 * doesn't have to.
 */
export const colors = defineTokens.colors({
  /** Brand. A desaturated indigo — the hue the whole system is tuned around. */
  neo: {
    50: { value: "#f4f6fb" },
    100: { value: "#e6eaf5" },
    200: { value: "#ccd5ea" },
    300: { value: "#a6b6d9" },
    400: { value: "#7a90c4" },
    500: { value: "#576eb0" },
    600: { value: "#425597" },
    700: { value: "#36457a" },
    800: { value: "#2c3861" },
    900: { value: "#1e2743" },
    950: { value: "#12172a" },
  },

  /** Neutral. A near-achromatic grey, very slightly cool, so it sits under `neo` quietly. */
  gray: {
    50: { value: "#fafafa" },
    100: { value: "#f4f4f5" },
    200: { value: "#e4e4e7" },
    300: { value: "#d4d4d8" },
    400: { value: "#a1a1aa" },
    500: { value: "#71717a" },
    600: { value: "#52525b" },
    700: { value: "#3f3f46" },
    800: { value: "#27272a" },
    900: { value: "#18181b" },
    950: { value: "#09090b" },
  },

  /** Danger — destructive actions, validation failures. */
  red: {
    50: { value: "#fef2f2" },
    100: { value: "#fee2e2" },
    200: { value: "#fecaca" },
    300: { value: "#fca5a5" },
    400: { value: "#f87171" },
    500: { value: "#ef4444" },
    600: { value: "#dc2626" },
    700: { value: "#b91c1c" },
    800: { value: "#991b1b" },
    900: { value: "#7f1d1d" },
    950: { value: "#450a0a" },
  },

  /** Success — completion, confirmation. */
  green: {
    50: { value: "#ecfdf5" },
    100: { value: "#d1fae5" },
    200: { value: "#a7f3d0" },
    300: { value: "#6ee7b7" },
    400: { value: "#34d399" },
    500: { value: "#10b981" },
    600: { value: "#059669" },
    700: { value: "#047857" },
    800: { value: "#065f46" },
    900: { value: "#064e3b" },
    950: { value: "#022c22" },
  },

  /** Warning — reversible risk, "are you sure". */
  amber: {
    50: { value: "#fffbeb" },
    100: { value: "#fef3c7" },
    200: { value: "#fde68a" },
    300: { value: "#fcd34d" },
    400: { value: "#fbbf24" },
    500: { value: "#f59e0b" },
    600: { value: "#d97706" },
    700: { value: "#b45309" },
    800: { value: "#92400e" },
    900: { value: "#78350f" },
    950: { value: "#451a03" },
  },

  /** Info — a cyan-leaning blue, kept well away from `neo` so the two never read as one. */
  sky: {
    50: { value: "#f0f9ff" },
    100: { value: "#e0f2fe" },
    200: { value: "#bae6fd" },
    300: { value: "#7dd3fc" },
    400: { value: "#38bdf8" },
    500: { value: "#0ea5e9" },
    600: { value: "#0284c7" },
    700: { value: "#0369a1" },
    800: { value: "#075985" },
    900: { value: "#0c4a6e" },
    950: { value: "#082f49" },
  },

  white: { value: "#ffffff" },
  black: { value: "#000000" },
  transparent: { value: "rgb(0 0 0 / 0)" },
  current: { value: "currentColor" },
});
