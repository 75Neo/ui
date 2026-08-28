import { createContext, useContext, useMemo, type ReactNode } from "react";
import { defu } from "defu";
import type { ThemeUI } from "@75neo/styles";

export interface ThemeContextValue {
  ui: ThemeUI;
}

const ThemeContext = createContext<ThemeContextValue>({ ui: {} });

export function useThemeContext(): ThemeContextValue {
  return useContext(ThemeContext);
}

export { ThemeContext };

export interface ThemeProviderProps {
  ui?: ThemeUI;
  children: ReactNode;
}

export function ThemeProvider({ ui = {}, children }: ThemeProviderProps) {
  const parent = useThemeContext();
  const merged = useMemo(() => defu(ui, parent.ui) as ThemeUI, [ui, parent.ui]);

  return <ThemeContext.Provider value={{ ui: merged }}>{children}</ThemeContext.Provider>;
}
