import { inject, type InjectionKey } from "vue";
import { sliderDefaults, type SliderVariants } from "@75neo/themes";

export const sliderVariantsKey: InjectionKey<SliderVariants> = Symbol("slider-variants");

/** Read the root's design axes. Outside a root these are the defaults. */
export function useSliderVariants(): SliderVariants {
  return inject(sliderVariantsKey, sliderDefaults);
}
