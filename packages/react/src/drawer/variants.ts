import { createContext, useContext } from "react";
import { drawerDefaults, type DrawerPlacement, type DrawerSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface DrawerVariants {
  placement: DrawerPlacement;
  size: DrawerSize;
}

const DrawerVariantsContext = createContext<DrawerVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useDrawerVariants(): DrawerVariants {
  return useContext(DrawerVariantsContext) ?? drawerDefaults;
}

export { DrawerVariantsContext };
