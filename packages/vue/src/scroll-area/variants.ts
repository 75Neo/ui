import { inject, type InjectionKey } from "vue";
import { scrollAreaDefaults, type ScrollAreaVariants } from "@75neo/themes";

export const scrollAreaVariantsKey: InjectionKey<ScrollAreaVariants> =
  Symbol("scroll-area-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useScrollAreaVariants(): ScrollAreaVariants {
  return inject(scrollAreaVariantsKey, scrollAreaDefaults);
}
