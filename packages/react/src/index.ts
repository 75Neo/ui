export { Button, type ButtonProps } from "./components/Button";
export { Theme, type ThemeProps } from "./components/Theme";
export { ThemeScopeContext } from "./context/ThemeContext";
export { useComponentTheme } from "./hooks/useComponentTheme";

// Re-exported so applications need only one import for the theme API.
export {
  ButtonKey,
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
