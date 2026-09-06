import type React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cva } from "class-variance-authority";
import {
  carouselDefaults,
  carouselSizeData,
  cn,
  type CarouselIndicatorProps as CarouselIndicatorContract,
} from "@75neo/themes";
import { useCarouselVariants } from "./variants";

const carouselIndicator = cva(
  "shrink-0 cursor-pointer rounded-full bg-accented outline-primary/25 transition-all duration-200 hover:bg-inverted/40 focus-visible:outline-3 data-current:bg-primary [&>svg]:size-full",
  {
    variants: { size: carouselSizeData.indicator },
    defaultVariants: carouselDefaults,
  },
);

export interface CarouselIndicatorProps
  extends Omit<React.ComponentProps<typeof Ark.Indicator>, "index">, CarouselIndicatorContract {}

export function CarouselIndicator({ index, className, ...rest }: CarouselIndicatorProps) {
  const variants = useCarouselVariants();

  return (
    <Ark.Indicator
      {...rest}
      index={index}
      data-slot="carousel-indicator"
      className={cn(carouselIndicator(variants), className)}
    />
  );
}
