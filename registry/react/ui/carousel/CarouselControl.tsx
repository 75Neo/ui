import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

export interface CarouselControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function CarouselControl({ className, children, ...props }: CarouselControlProps) {
  const styles = carousel();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
