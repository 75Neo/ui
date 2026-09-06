import { createContext, useContext } from "react";
import { ratingGroupDefaults, type RatingGroupColor, type RatingGroupSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface RatingGroupVariants {
  color: RatingGroupColor;
  size: RatingGroupSize;
}

const RatingGroupVariantsContext = createContext<RatingGroupVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useRatingGroupVariants(): RatingGroupVariants {
  return useContext(RatingGroupVariantsContext) ?? ratingGroupDefaults;
}

export { RatingGroupVariantsContext };
