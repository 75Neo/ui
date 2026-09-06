import { createContext, useContext } from "react";
import { tourDefaults, type TourSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface TourVariants {
  size: TourSize;
}

const TourVariantsContext = createContext<TourVariants | null>(null);

/** Read the root's design axis. Outside a root this is the default. */
export function useTourVariants(): TourVariants {
  return useContext(TourVariantsContext) ?? tourDefaults;
}

export { TourVariantsContext };
