import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { sliderStyles as styles } from "@/registry/shared/lib/slider.styles";

export interface SliderMarkerGroupProps extends React.ComponentPropsWithRef<
  typeof Ark.MarkerGroup
> {}

export default function SliderMarkerGroup({
  className,
  children,
  ...props
}: SliderMarkerGroupProps) {
  return (
    <Ark.MarkerGroup className={cn(styles.markerGroup(), className)} {...props}>
      {children}
    </Ark.MarkerGroup>
  );
}
