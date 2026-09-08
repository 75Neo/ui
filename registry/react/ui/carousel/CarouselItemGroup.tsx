import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carouselStyles as styles } from "@/registry/shared/lib/carousel.styles";

export interface CarouselItemGroupProps extends React.ComponentPropsWithRef<typeof Ark.ItemGroup> {}

export default function CarouselItemGroup({
  className,
  children,
  ...props
}: CarouselItemGroupProps) {
  return (
    <Ark.ItemGroup className={cn(styles.itemGroup(), className)} {...props}>
      {children}
    </Ark.ItemGroup>
  );
}
