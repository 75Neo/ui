import type React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn, type CarouselItemProps as CarouselItemContract } from "@75neo/themes";

export interface CarouselItemProps
  extends Omit<React.ComponentProps<typeof Ark.Item>, "index">, CarouselItemContract {}

export function CarouselItem({ index, className, children, ...rest }: CarouselItemProps) {
  return (
    <Ark.Item
      {...rest}
      index={index}
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 basis-full snap-center overflow-hidden rounded-lg bg-muted",
        className,
      )}
    >
      {children}
    </Ark.Item>
  );
}
