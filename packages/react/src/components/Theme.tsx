import { type ReactNode, createElement, useContext, useMemo } from "react";
import { type ThemeConfig, layerTheme } from "@75neo/core";
import { ThemeContext } from "../context/ThemeContext";

export interface ThemeProps {
  /**
   * Overrides for any subset of the installed components. Keep the object stable: a
   * fresh literal on every render re-folds the theme chain.
   */
  theme: ThemeConfig;
  children?: ReactNode;
}

/**
 * Restyle every component below this point.
 *
 * @remarks
 * Nesting composes. An inner `Theme` is folded onto the one it sits inside, so a
 * component reads one flat config rather than walking a chain.
 *
 * @example
 * ```tsx
 * <Theme theme={{ button: { ui: { base: "rounded-full" } } }}>
 *   <Button>Rounded</Button>
 * </Theme>
 * ```
 */
export function Theme({ theme, children }: ThemeProps) {
  const parent = useContext(ThemeContext);
  const config = useMemo(() => (parent ? layerTheme(parent, theme) : theme), [parent, theme]);

  return createElement(ThemeContext.Provider, { value: config }, children);
}
