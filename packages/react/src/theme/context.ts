import type { ThemeConfig } from "@75neo/styles";
import { createContext } from "react";

/**
 * The app-wide theme override, or `null` when nothing overrides the built-in themes.
 *
 * Kept in its own module so the provider and the hook can both reach it without either
 * importing the other.
 */
export const ThemeContext = createContext<ThemeConfig | null>(null);
