import { createContext, useContext } from "react";
import { pinInputDefaults, type PinInputColor, type PinInputSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface PinInputVariants {
  color: PinInputColor;
  size: PinInputSize;
}

const PinInputVariantsContext = createContext<PinInputVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function usePinInputVariants(): PinInputVariants {
  return useContext(PinInputVariantsContext) ?? pinInputDefaults;
}

export { PinInputVariantsContext };
