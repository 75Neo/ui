import { createContext, useContext } from "react";
import { popoverDefaults, type PopoverSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface PopoverVariants {
  size: PopoverSize;
  close: boolean;
}

const PopoverVariantsContext = createContext<PopoverVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function usePopoverVariants(): PopoverVariants {
  return useContext(PopoverVariantsContext) ?? popoverDefaults;
}

export { PopoverVariantsContext };
