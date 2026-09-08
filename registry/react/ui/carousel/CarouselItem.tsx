import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carouselStyles as styles } from "@/registry/shared/lib/carousel.styles";

export interface CarouselItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function CarouselItem({ className, children, ...props }: CarouselItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
