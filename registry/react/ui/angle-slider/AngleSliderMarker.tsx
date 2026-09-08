import React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn } from "cn";
import { angleSlider } from "@/registry/shared/lib/angle-slider.styles";

export interface AngleSliderMarkerProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Marker>,
  "children"
> {}

export default function AngleSliderMarker({ className, ...props }: AngleSliderMarkerProps) {
  const styles = angleSlider();

  return <Ark.Marker className={cn(styles.marker(), className)} {...props} />;
}
