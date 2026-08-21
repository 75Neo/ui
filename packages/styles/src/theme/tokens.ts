import { defineTokens } from "@pandacss/dev";

/**
 * Raw, context-free values. Never reference these directly in a component —
 * use the semantic tokens so light/dark stays automatic.
 */
export const tokens = defineTokens({
  colors: {
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
    red: {
      500: { value: "#ef4444" },
      600: { value: "#dc2626" },
    },
  },
  radii: {
    xs: { value: "0.25rem" },
    sm: { value: "0.375rem" },
    md: { value: "0.5rem" },
    lg: { value: "0.75rem" },
    full: { value: "9999px" },
  },
  fonts: {
    sans: {
      value: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
    },
    mono: { value: "ui-monospace, SFMono-Regular, Menlo, monospace" },
  },
  durations: {
    fast: { value: "120ms" },
    normal: { value: "200ms" },
  },
});
