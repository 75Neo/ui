import { inject, type InjectionKey } from "vue";
import { tourDefaults, type TourSize } from "@75neo/themes";

/** What the root publishes and every part reads. */
export interface TourVariants {
  size: TourSize;
}

export const tourVariantsKey: InjectionKey<TourVariants> = Symbol("tour-variants");

/** Read the root's design axis. Outside a root this is the default. */
export function useTourVariants(): TourVariants {
  return inject(tourVariantsKey, tourDefaults);
}
