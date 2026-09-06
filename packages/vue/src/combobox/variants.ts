import { inject, type InjectionKey } from "vue";
import { comboboxDefaults, type ComboboxColor, type ComboboxSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface ComboboxVariants {
  color: ComboboxColor;
  size: ComboboxSize;
}

export const comboboxVariantsKey: InjectionKey<ComboboxVariants> = Symbol("combobox-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useComboboxVariants(): ComboboxVariants {
  return inject(comboboxVariantsKey, comboboxDefaults);
}
