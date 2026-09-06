import { createContext, useContext } from "react";
import { radioGroupDefaults, type RadioGroupColor, type RadioGroupSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface RadioGroupVariants {
  color: RadioGroupColor;
  size: RadioGroupSize;
}

const RadioGroupVariantsContext = createContext<RadioGroupVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useRadioGroupVariants(): RadioGroupVariants {
  return useContext(RadioGroupVariantsContext) ?? radioGroupDefaults;
}

export { RadioGroupVariantsContext };
