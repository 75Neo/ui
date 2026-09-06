import { createContext, useContext } from "react";
import {
  toggleGroupDefaults,
  type ToggleGroupColor,
  type ToggleGroupOrientation,
  type ToggleGroupSize,
  type ToggleGroupVariant,
} from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface ToggleGroupVariants {
  variant: ToggleGroupVariant;
  color: ToggleGroupColor;
  size: ToggleGroupSize;
  orientation: ToggleGroupOrientation;
}

const ToggleGroupVariantsContext = createContext<ToggleGroupVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useToggleGroupVariants(): ToggleGroupVariants {
  return useContext(ToggleGroupVariantsContext) ?? toggleGroupDefaults;
}

export { ToggleGroupVariantsContext };
