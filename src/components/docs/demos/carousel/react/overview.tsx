import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from "@/components/react";

const slides = ["accordion", "dialog", "table", "tabs"];

export default function CarouselOverview() {
  return (
    <Carousel slideCount={slides.length} spacing="12px" loop className="max-w-lg">
      <CarouselItemGroup>
        {slides.map((slide, index) => (
          <CarouselItem key={slide} index={index}>
            <div className="flex h-32 items-center justify-center rounded-md bg-muted/60 font-mono text-sm text-muted">
              {slide}
            </div>
          </CarouselItem>
        ))}
      </CarouselItemGroup>

      <CarouselControl>
        <CarouselPrevTrigger aria-label="Previous slide">
          <ChevronLeft />
        </CarouselPrevTrigger>
        <CarouselIndicatorGroup>
          {slides.map((slide, index) => (
            <CarouselIndicator key={slide} index={index} aria-label={`Go to ${slide}`} />
          ))}
        </CarouselIndicatorGroup>
        <CarouselNextTrigger aria-label="Next slide">
          <ChevronRight />
        </CarouselNextTrigger>
      </CarouselControl>
    </Carousel>
  );
}
