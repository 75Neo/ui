import { createContext, useContext } from "react";
import { navigationMenuDefaults, type NavigationMenuVariants } from "@75neo/themes";

const NavigationMenuVariantsContext = createContext<NavigationMenuVariants | null>(null);

/** Read the root's design axes. Outside a root these are the defaults. */
export function useNavigationMenuVariants(): NavigationMenuVariants {
  return useContext(NavigationMenuVariantsContext) ?? navigationMenuDefaults;
}

export { NavigationMenuVariantsContext };
