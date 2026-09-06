import { inject, type InjectionKey } from "vue";
import { drawerDefaults, type DrawerPlacement, type DrawerSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface DrawerVariants {
  placement: DrawerPlacement;
  size: DrawerSize;
}

export const drawerVariantsKey: InjectionKey<DrawerVariants> = Symbol("drawer-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useDrawerVariants(): DrawerVariants {
  return inject(drawerVariantsKey, drawerDefaults);
}
