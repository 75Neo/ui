import { resolveTheme, type ThemeName, type Themes } from "@75neo/styles";
import { useContext } from "react";
import { ThemeContext } from "./context";

/**
 * The theme a component should style itself with: the built-in one, or the app's
 * override merged over it if a {@link NeoUIProvider} supplied one.
 *
 * The result is referentially stable for a given provider value, so it is safe to use as
 * a dependency.
 */
export const useComponentTheme = <K extends ThemeName>(name: K): Themes[K] =>
  resolveTheme(name, useContext(ThemeContext));
