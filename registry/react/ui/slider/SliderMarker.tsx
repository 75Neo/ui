import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

export interface SliderMarkerProps extends React.ComponentPropsWithRef<typeof Ark.Marker> {}

export default function SliderMarker({ className, children, ...props }: SliderMarkerProps) {
  const styles = slider();

  return (
    <Ark.Marker className={cn(styles.marker(), className)} {...props}>
      {children}
    </Ark.Marker>
  );
}
