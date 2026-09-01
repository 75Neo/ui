import { createContext } from "react";
import type { ThemeConfig } from "@75neo/core";

export const ThemeContext = createContext<ThemeConfig | undefined>(undefined);
