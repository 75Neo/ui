import { createContext, useContext } from "react";
import { tabsDefaults, type TabsColor, type TabsSize, type TabsVariant } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface TabsVariants {
  variant: TabsVariant;
  color: TabsColor;
  size: TabsSize;
}

const TabsVariantsContext = createContext<TabsVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTabsVariants(): TabsVariants {
  return useContext(TabsVariantsContext) ?? tabsDefaults;
}

export { TabsVariantsContext };
