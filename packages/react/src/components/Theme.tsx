import { type ReactNode, createElement, useContext, useMemo } from "react";
import { type ThemeConfig, layerTheme } from "@75neo/core";
import { ThemeContext } from "../context/ThemeContext";

export interface ThemeProps {
  /** Overrides for any subset of the installed components. */
  theme: ThemeConfig;
  children?: ReactNode;
}

/**
 * Restyle every component below this point.
 *
 * Nesting composes: an inner `Theme` is folded onto the one it sits inside when it
 * mounts, so a component reads one flat config rather than walking a chain. Layering
 * happens here rather than per component, which is why `theme` should be a stable
 * object -- a fresh literal on every render re-folds the chain.
 */
export function Theme({ theme, children }: ThemeProps) {
  const parent = useContext(ThemeContext);
  const config = useMemo(() => (parent ? layerTheme(parent, theme) : theme), [parent, theme]);

  return createElement(ThemeContext.Provider, { value: config }, children);
}
