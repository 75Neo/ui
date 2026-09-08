import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

export interface CarouselAutoplayTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.AutoplayTrigger
> {}

export default function CarouselAutoplayTrigger({
  className,
  children,
  ...props
}: CarouselAutoplayTriggerProps) {
  const styles = carousel();

  return (
    <Ark.AutoplayTrigger className={cn(styles.autoplayTrigger(), className)} {...props}>
      {children}
    </Ark.AutoplayTrigger>
  );
}
