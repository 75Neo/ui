import React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

export interface CarouselProgressTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ProgressText>,
  "children"
> {}

export default function CarouselProgressText({ className, ...props }: CarouselProgressTextProps) {
  const styles = carousel();

  return <Ark.ProgressText className={cn(styles.progressText(), className)} {...props} />;
}
