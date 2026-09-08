import React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

export interface AngleSliderMarkerProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Marker>,
  "children"
> {}

export default function AngleSliderMarker({ className, ...props }: AngleSliderMarkerProps) {
  return <Ark.Marker className={cn(styles.marker(), className)} {...props} />;
}
