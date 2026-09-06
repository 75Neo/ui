import { createContext, useContext } from "react";
import { marqueeDefaults, type MarqueeVariants } from "@75neo/themes";

const MarqueeVariantsContext = createContext<MarqueeVariants | null>(null);

/** Read the root's design axes. Outside a root these are the defaults. */
export function useMarqueeVariants(): MarqueeVariants {
  return useContext(MarqueeVariantsContext) ?? marqueeDefaults;
}

export { MarqueeVariantsContext };
