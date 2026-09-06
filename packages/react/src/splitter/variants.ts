import { createContext, useContext } from "react";
import { splitterDefaults, type SplitterVariants } from "@75neo/themes";

const SplitterVariantsContext = createContext<SplitterVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSplitterVariants(): SplitterVariants {
  return useContext(SplitterVariantsContext) ?? splitterDefaults;
}

export { SplitterVariantsContext };
