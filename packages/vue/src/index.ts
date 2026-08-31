export { default as Button } from "./components/Button.vue";
export { default as Theme } from "./components/Theme.vue";
export {
  provideTheme,
  useComponentTheme,
  useThemeConfig,
} from "./composables/useComponentTheme.ts";

// Re-exported so applications need only one import for the theme API.
export {
  type ButtonProps,
  type ButtonTheme,
  type ButtonUI,
  type ComponentContract,
  type ComponentKey,
  type ComponentThemes,
  type PropsOf,
  type SlotsOf,
  type ThemeConfig,
  type ThemeOverride,
  type ThemeOverrideOf,
  type TVClasses,
  type TVSlot,
  applyThemeConfigs,
  applyThemeOverrides,
} from "@75neo/core";
