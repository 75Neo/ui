import { inject, type InjectionKey } from "vue";
import { tabsDefaults, type TabsColor, type TabsSize, type TabsVariant } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface TabsVariants {
  variant: TabsVariant;
  color: TabsColor;
  size: TabsSize;
}

export const tabsVariantsKey: InjectionKey<TabsVariants> = Symbol("tabs-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useTabsVariants(): TabsVariants {
  return inject(tabsVariantsKey, tabsDefaults);
}
