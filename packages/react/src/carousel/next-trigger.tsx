import type React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cva } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import { carouselDefaults, carouselSizeData, cn } from "@75neo/themes";
import { useCarouselVariants } from "./variants";

const carouselNextTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-default text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: { size: carouselSizeData.trigger },
    defaultVariants: carouselDefaults,
  },
);

export interface CarouselNextTriggerProps extends React.ComponentProps<typeof Ark.NextTrigger> {}

export function CarouselNextTrigger({ className, children, ...rest }: CarouselNextTriggerProps) {
  const variants = useCarouselVariants();

  return (
    <Ark.NextTrigger
      {...rest}
      data-slot="carousel-next-trigger"
      className={cn(carouselNextTrigger(variants), className)}
    >
      {children ?? <ChevronRight />}
    </Ark.NextTrigger>
  );
}
