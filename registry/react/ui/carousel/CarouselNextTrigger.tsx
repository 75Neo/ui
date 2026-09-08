import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

export interface CarouselNextTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.NextTrigger
> {}

export default function CarouselNextTrigger({
  className,
  children,
  ...props
}: CarouselNextTriggerProps) {
  const styles = carousel();

  return (
    <Ark.NextTrigger className={cn(styles.nextTrigger(), className)} {...props}>
      {children}
    </Ark.NextTrigger>
  );
}
