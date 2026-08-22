import type { ThemeConfig } from "@75neo/styles";
import type { ReactNode } from "react";
import { ThemeContext } from "./context";

export interface NeoUIProviderProps {
  /**
   * Per-component class overrides, merged into the built-in themes.
   *
   * Define it *outside* the component that renders the provider — the resolved themes
   * are memoised on this object's identity, so a fresh object each render rebuilds every
   * theme it touches.
   */
  theme?: ThemeConfig;
  children?: ReactNode;
}

/**
 * Applies an app-wide theme to every 75NeoUI component below it.
 *
 * ```tsx
 * const theme: ThemeConfig = {
 *   button: { slots: { base: "rounded-full" } },
 *   accordion: { defaultVariants: { variant: "plain" } },
 * };
 *
 * <NeoUIProvider theme={theme}>
 *   <App />
 * </NeoUIProvider>
 * ```
 *
 * Components work without it — the provider is only needed to change their defaults.
 */
export const NeoUIProvider = ({ theme = undefined, children }: NeoUIProviderProps) => (
  <ThemeContext.Provider value={theme ?? null}>{children}</ThemeContext.Provider>
);

NeoUIProvider.displayName = "NeoUIProvider";
