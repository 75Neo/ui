import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carouselStyles as styles } from "@/registry/shared/lib/carousel.styles";

export interface CarouselIndicatorProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Indicator>,
  "children"
> {}

export default function CarouselIndicator({ className, ...props }: CarouselIndicatorProps) {
  return <Ark.Indicator className={cn(styles.indicator(), className)} {...props} />;
}
