import { createContext, useContext } from "react";
import { floatingPanelDefaults, type FloatingPanelSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface FloatingPanelVariants {
  size: FloatingPanelSize;
}

const FloatingPanelVariantsContext = createContext<FloatingPanelVariants | null>(null);

/** Read the root's design axis. Outside a root this is the default. */
export function useFloatingPanelVariants(): FloatingPanelVariants {
  return useContext(FloatingPanelVariantsContext) ?? floatingPanelDefaults;
}

export { FloatingPanelVariantsContext };
