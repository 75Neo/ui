import { createContext } from "react";
import type { ThemeScope } from "@75neo/core";

/**
 * The nearest theme scope. `undefined` outside any `<Theme>`, which is what makes a component
 * fall back to its own theme with no work at all.
 */
export const ThemeScopeContext = createContext<ThemeScope | undefined>(undefined);
