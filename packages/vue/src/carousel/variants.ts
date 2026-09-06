import { inject, type InjectionKey } from "vue";
import { carouselDefaults, type CarouselVariants } from "@75neo/themes";

export const carouselVariantsKey: InjectionKey<CarouselVariants> = Symbol("carousel-variants");

/** Read the root's design axes. Outside a root this is the defaults. */
export function useCarouselVariants(): CarouselVariants {
  return inject(carouselVariantsKey, carouselDefaults);
}
