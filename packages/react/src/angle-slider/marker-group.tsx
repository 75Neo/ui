import type React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn } from "@75neo/themes";

export interface AngleSliderMarkerGroupProps extends React.ComponentProps<typeof Ark.MarkerGroup> {}

export function AngleSliderMarkerGroup({
  className,
  children,
  ...rest
}: AngleSliderMarkerGroupProps) {
  return (
    <Ark.MarkerGroup
      {...rest}
      data-slot="angle-slider-marker-group"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {children}
    </Ark.MarkerGroup>
  );
}
