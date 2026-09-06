import { createContext, useContext } from "react";
import { scrollAreaDefaults, type ScrollAreaVariants } from "@75neo/themes";

const ScrollAreaVariantsContext = createContext<ScrollAreaVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useScrollAreaVariants(): ScrollAreaVariants {
  return useContext(ScrollAreaVariantsContext) ?? scrollAreaDefaults;
}

export { ScrollAreaVariantsContext };
