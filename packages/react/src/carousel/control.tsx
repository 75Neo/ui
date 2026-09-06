import type React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "@75neo/themes";

export interface CarouselControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function CarouselControl({ className, children, ...rest }: CarouselControlProps) {
  return (
    <Ark.Control
      {...rest}
      data-slot="carousel-control"
      className={cn(
        "flex items-center gap-3 data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:flex-1 data-[orientation=vertical]:flex-col",
        className,
      )}
    >
      {children}
    </Ark.Control>
  );
}
