import { createContext, useContext } from "react";
import { collapsibleDefaults, type CollapsibleVariants } from "@75neo/themes";

const CollapsibleVariantsContext = createContext<CollapsibleVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useCollapsibleVariants(): CollapsibleVariants {
  return useContext(CollapsibleVariantsContext) ?? collapsibleDefaults;
}

export { CollapsibleVariantsContext };
