import React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

export interface AngleSliderMarkerGroupProps extends React.ComponentPropsWithRef<
  typeof Ark.MarkerGroup
> {}

export default function AngleSliderMarkerGroup({
  className,
  children,
  ...props
}: AngleSliderMarkerGroupProps) {
  return (
    <Ark.MarkerGroup className={cn(styles.markerGroup(), className)} {...props}>
      {children}
    </Ark.MarkerGroup>
  );
}
