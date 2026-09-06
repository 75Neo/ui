import { inject, type InjectionKey } from "vue";
import { menuDefaults, type MenuColor, type MenuSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface MenuVariants {
  color: MenuColor;
  size: MenuSize;
}

export const menuVariantsKey: InjectionKey<MenuVariants> = Symbol("menu-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useMenuVariants(): MenuVariants {
  return inject(menuVariantsKey, menuDefaults);
}
