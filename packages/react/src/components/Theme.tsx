import { type ReactNode, createElement, useContext, useMemo } from "react";
import { type ThemeConfig, applyThemeConfigs } from "@75neo/core";
import { ThemeContext } from "../context/ThemeContext";

export interface ThemeProps {
  /** A layer of per-component overrides, keyed by component. */
  theme: ThemeConfig;
  children?: ReactNode;
}

export function Theme({ theme, children }: ThemeProps) {
  const parent = useContext(ThemeContext);
  const config = useMemo(
    () => (parent ? applyThemeConfigs(parent, theme) : theme),
    [parent, theme],
  );

  return createElement(ThemeContext.Provider, { value: config }, children);
}
