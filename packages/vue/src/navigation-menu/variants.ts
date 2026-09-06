import { inject, type InjectionKey } from "vue";
import { navigationMenuDefaults, type NavigationMenuVariants } from "@75neo/themes";

export const navigationMenuVariantsKey: InjectionKey<NavigationMenuVariants> = Symbol(
  "navigation-menu-variants",
);

/** Read the root's design axes. Outside a root these are the defaults. */
export function useNavigationMenuVariants(): NavigationMenuVariants {
  return inject(navigationMenuVariantsKey, navigationMenuDefaults);
}
