import { inject, type InjectionKey } from "vue";
import { checkboxDefaults, type CheckboxColor, type CheckboxSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface CheckboxVariants {
  color: CheckboxColor;
  size: CheckboxSize;
}

export const checkboxVariantsKey: InjectionKey<CheckboxVariants> = Symbol("checkbox-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useCheckboxVariants(): CheckboxVariants {
  return inject(checkboxVariantsKey, checkboxDefaults);
}
