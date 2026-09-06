import { createContext, useContext } from "react";
import { stepsDefaults, type StepsColor, type StepsSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface StepsVariants {
  size: StepsSize;
  color: StepsColor;
}

const StepsVariantsContext = createContext<StepsVariants | null>(null);

/** Read the root's design axes. Outside a root these are the defaults. */
export function useStepsVariants(): StepsVariants {
  return useContext(StepsVariantsContext) ?? stepsDefaults;
}

export { StepsVariantsContext };
