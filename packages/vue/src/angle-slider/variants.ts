import { inject, type InjectionKey } from "vue";
import { angleSliderDefaults, type AngleSliderVariants } from "@75neo/themes";

export const angleSliderVariantsKey: InjectionKey<AngleSliderVariants> =
  Symbol("angle-slider-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useAngleSliderVariants(): AngleSliderVariants {
  return inject(angleSliderVariantsKey, angleSliderDefaults);
}
