import { createContext } from "react";
import type { ThemeConfig } from "@75neo/core";

/**
 * The theme every component below a `Theme` reads, already folded flat by `layerTheme`.
 *
 * `undefined` means no `Theme` above, which is the common case: a component then renders
 * its recipe's own classes.
 */
export const ThemeContext = createContext<ThemeConfig | undefined>(undefined);
