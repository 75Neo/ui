import { createContext, useContext } from "react";
import { hoverCardDefaults, type HoverCardSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface HoverCardVariants {
  size: HoverCardSize;
}

const HoverCardVariantsContext = createContext<HoverCardVariants | null>(null);

/** Read the root's design axis. Outside a root this is the default. */
export function useHoverCardVariants(): HoverCardVariants {
  return useContext(HoverCardVariantsContext) ?? hoverCardDefaults;
}

export { HoverCardVariantsContext };
