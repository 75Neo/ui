import { createContext, useContext } from "react";
import { angleSliderDefaults, type AngleSliderVariants } from "@75neo/themes";

const AngleSliderVariantsContext = createContext<AngleSliderVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useAngleSliderVariants(): AngleSliderVariants {
  return useContext(AngleSliderVariantsContext) ?? angleSliderDefaults;
}

export { AngleSliderVariantsContext };
