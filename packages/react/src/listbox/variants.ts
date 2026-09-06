import { createContext, useContext } from "react";
import { listboxDefaults, type ListboxColor, type ListboxSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface ListboxVariants {
  color: ListboxColor;
  size: ListboxSize;
}

const ListboxVariantsContext = createContext<ListboxVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useListboxVariants(): ListboxVariants {
  return useContext(ListboxVariantsContext) ?? listboxDefaults;
}

export { ListboxVariantsContext };
