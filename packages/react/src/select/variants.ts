import { createContext, useContext } from "react";
import { selectDefaults, type SelectColor, type SelectSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface SelectVariants {
  color: SelectColor;
  size: SelectSize;
}

const SelectVariantsContext = createContext<SelectVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSelectVariants(): SelectVariants {
  return useContext(SelectVariantsContext) ?? selectDefaults;
}

export { SelectVariantsContext };
