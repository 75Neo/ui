import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

export interface CarouselItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function CarouselItem({ className, children, ...props }: CarouselItemProps) {
  const styles = carousel();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
