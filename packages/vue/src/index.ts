export { default as Button } from "./components/Button.vue";
export { default as Theme } from "./components/Theme.vue";
export { injectThemeScope, provideThemeScope, useComponentTheme } from "./composables/useTheme";

// Re-exported so applications need only one import for the theme API.
export {
  ButtonKey,
  type ButtonProps,
  type ButtonTheme,
  type ButtonUI,
  type ComponentContract,
  type ComponentKey,
  type ComponentThemes,
  type PropsOf,
  type ResolvedTheme,
  type SlotsOf,
  type Theme as ThemeLayer,
  type ThemeConfig,
  type ThemeOverride,
  type ThemeScope,
  type TVClasses,
  type TVSlot,
} from "@75neo/core";
