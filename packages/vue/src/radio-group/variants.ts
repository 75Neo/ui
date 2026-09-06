import { inject, type InjectionKey } from "vue";
import { radioGroupDefaults, type RadioGroupColor, type RadioGroupSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface RadioGroupVariants {
  color: RadioGroupColor;
  size: RadioGroupSize;
}

export const radioGroupVariantsKey: InjectionKey<RadioGroupVariants> =
  Symbol("radio-group-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useRadioGroupVariants(): RadioGroupVariants {
  return inject(radioGroupVariantsKey, radioGroupDefaults);
}
