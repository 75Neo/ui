import { createContext, useContext } from "react";
import { progressDefaults, type ProgressColor, type ProgressSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface ProgressVariants {
  size: ProgressSize;
  color: ProgressColor;
}

const ProgressVariantsContext = createContext<ProgressVariants | null>(null);

/** Read the root's design axes. Outside a root these are the defaults. */
export function useProgressVariants(): ProgressVariants {
  return useContext(ProgressVariantsContext) ?? progressDefaults;
}

export { ProgressVariantsContext };
