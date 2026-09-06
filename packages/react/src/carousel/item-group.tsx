import type React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "@75neo/themes";

export interface CarouselItemGroupProps extends React.ComponentProps<typeof Ark.ItemGroup> {}

export function CarouselItemGroup({ className, children, ...rest }: CarouselItemGroupProps) {
  return (
    <Ark.ItemGroup
      {...rest}
      data-slot="carousel-item-group"
      className={cn(
        "min-w-0 flex-1 overflow-hidden scroll-smooth data-[orientation=vertical]:min-h-0",
        className,
      )}
    >
      {children}
    </Ark.ItemGroup>
  );
}
