import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

export interface CarouselProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Carousel({ className, children, ...props }: CarouselProps) {
  const styles = carousel();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
