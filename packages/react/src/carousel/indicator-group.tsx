import type React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "@75neo/themes";

export interface CarouselIndicatorGroupProps extends React.ComponentProps<
  typeof Ark.IndicatorGroup
> {}

export function CarouselIndicatorGroup({
  className,
  children,
  ...rest
}: CarouselIndicatorGroupProps) {
  return (
    <Ark.IndicatorGroup
      {...rest}
      data-slot="carousel-indicator-group"
      className={cn(
        "flex items-center justify-center gap-2 data-[orientation=vertical]:flex-col",
        className,
      )}
    >
      {children}
    </Ark.IndicatorGroup>
  );
}
