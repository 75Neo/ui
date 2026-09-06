import type React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cva } from "class-variance-authority";
import { ChevronLeft } from "lucide-react";
import { carouselDefaults, carouselSizeData, cn } from "@75neo/themes";
import { useCarouselVariants } from "./variants";

const carouselPrevTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-default text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: { size: carouselSizeData.trigger },
    defaultVariants: carouselDefaults,
  },
);

export interface CarouselPrevTriggerProps extends React.ComponentProps<typeof Ark.PrevTrigger> {}

export function CarouselPrevTrigger({ className, children, ...rest }: CarouselPrevTriggerProps) {
  const variants = useCarouselVariants();

  return (
    <Ark.PrevTrigger
      {...rest}
      data-slot="carousel-prev-trigger"
      className={cn(carouselPrevTrigger(variants), className)}
    >
      {children ?? <ChevronLeft />}
    </Ark.PrevTrigger>
  );
}
