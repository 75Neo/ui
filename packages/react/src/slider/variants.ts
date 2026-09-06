import { createContext, useContext } from "react";
import { sliderDefaults, type SliderVariants } from "@75neo/themes";

const SliderVariantsContext = createContext<SliderVariants | null>(null);

/** Read the root's design axes. Outside a root these are the defaults. */
export function useSliderVariants(): SliderVariants {
  return useContext(SliderVariantsContext) ?? sliderDefaults;
}

export { SliderVariantsContext };
