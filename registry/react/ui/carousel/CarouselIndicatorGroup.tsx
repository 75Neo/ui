import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

export interface CarouselIndicatorGroupProps extends React.ComponentPropsWithRef<
  typeof Ark.IndicatorGroup
> {}

export default function CarouselIndicatorGroup({
  className,
  children,
  ...props
}: CarouselIndicatorGroupProps) {
  const styles = carousel();

  return (
    <Ark.IndicatorGroup className={cn(styles.indicatorGroup(), className)} {...props}>
      {children}
    </Ark.IndicatorGroup>
  );
}
