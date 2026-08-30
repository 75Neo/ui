import type { ReactNode } from "react";
import type { ThemeUI } from "@75neo/core";
import { ThemeProvider } from "../context/ThemeContext";

export interface ThemeProps {
  ui?: ThemeUI;
  children: ReactNode;
}

export function Theme({ ui, children }: ThemeProps) {
  return <ThemeProvider ui={ui}>{children}</ThemeProvider>;
}
