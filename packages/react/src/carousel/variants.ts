import { createContext, useContext } from "react";
import { carouselDefaults, type CarouselVariants } from "@75neo/themes";

const CarouselVariantsContext = createContext<CarouselVariants | null>(null);

/** Read the root's design axes. Outside a root this is the defaults. */
export function useCarouselVariants(): CarouselVariants {
  return useContext(CarouselVariantsContext) ?? carouselDefaults;
}

export { CarouselVariantsContext };
