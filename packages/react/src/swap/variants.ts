import { createContext, useContext } from "react";
import { swapDefaults, type SwapVariants } from "@75neo/themes";

const SwapVariantsContext = createContext<SwapVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSwapVariants(): SwapVariants {
  return useContext(SwapVariantsContext) ?? swapDefaults;
}

export { SwapVariantsContext };
