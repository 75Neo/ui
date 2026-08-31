import { type ReactNode, createElement, useContext, useMemo } from "react";
import { type ThemeConfig, createThemeScope } from "@75neo/core";
import { ThemeScopeContext } from "../context/ThemeContext";

export interface ThemeProps {
  /** A layer of per-component overrides, keyed by component. */
  theme: ThemeConfig;
  children?: ReactNode;
}

/**
 * Opens a new theme scope below the one already in context, if any. The context value carries
 * only this scope's own overrides plus a link to its parent, so nesting costs one object and
 * nothing is merged until a component asks for its key.
 */
export function Theme({ theme, children }: ThemeProps) {
  const parent = useContext(ThemeScopeContext);
  const scope = useMemo(() => createThemeScope(theme, parent), [theme, parent]);

  return createElement(ThemeScopeContext.Provider, { value: scope }, children);
}
