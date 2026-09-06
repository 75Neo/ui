import { inject, type InjectionKey } from "vue";
import { collapsibleDefaults, type CollapsibleVariants } from "@75neo/themes";

export const collapsibleVariantsKey: InjectionKey<CollapsibleVariants> =
  Symbol("collapsible-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useCollapsibleVariants(): CollapsibleVariants {
  return inject(collapsibleVariantsKey, collapsibleDefaults);
}
