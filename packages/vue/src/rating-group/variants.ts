import { inject, type InjectionKey } from "vue";
import { ratingGroupDefaults, type RatingGroupColor, type RatingGroupSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface RatingGroupVariants {
  color: RatingGroupColor;
  size: RatingGroupSize;
}

export const ratingGroupVariantsKey: InjectionKey<RatingGroupVariants> =
  Symbol("rating-group-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useRatingGroupVariants(): RatingGroupVariants {
  return inject(ratingGroupVariantsKey, ratingGroupDefaults);
}
