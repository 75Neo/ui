import { createContext, useContext } from "react";
import { switchDefaults, type SwitchColor, type SwitchSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface SwitchVariants {
  color: SwitchColor;
  size: SwitchSize;
  loading: boolean;
}

const SwitchVariantsContext = createContext<SwitchVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSwitchVariants(): SwitchVariants {
  return useContext(SwitchVariantsContext) ?? switchDefaults;
}

export { SwitchVariantsContext };
