import { createContext, useContext } from "react";
import {
  numberInputDefaults,
  type NumberInputColor,
  type NumberInputOrientation,
  type NumberInputSize,
} from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface NumberInputVariants {
  color: NumberInputColor;
  size: NumberInputSize;
  orientation: NumberInputOrientation;
}

const NumberInputVariantsContext = createContext<NumberInputVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useNumberInputVariants(): NumberInputVariants {
  return useContext(NumberInputVariantsContext) ?? numberInputDefaults;
}

export { NumberInputVariantsContext };
