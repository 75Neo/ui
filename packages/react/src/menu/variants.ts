import { createContext, useContext } from "react";
import { menuDefaults, type MenuColor, type MenuSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface MenuVariants {
  color: MenuColor;
  size: MenuSize;
}

const MenuVariantsContext = createContext<MenuVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useMenuVariants(): MenuVariants {
  return useContext(MenuVariantsContext) ?? menuDefaults;
}

export { MenuVariantsContext };
