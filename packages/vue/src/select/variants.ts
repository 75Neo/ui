import { inject, type InjectionKey } from "vue";
import { selectDefaults, type SelectColor, type SelectSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface SelectVariants {
  color: SelectColor;
  size: SelectSize;
}

export const selectVariantsKey: InjectionKey<SelectVariants> = Symbol("select-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useSelectVariants(): SelectVariants {
  return inject(selectVariantsKey, selectDefaults);
}
