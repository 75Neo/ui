import type React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn, type AngleSliderMarkerProps as AngleSliderMarkerContract } from "@75neo/themes";

export interface AngleSliderMarkerProps
  extends Omit<React.ComponentProps<typeof Ark.Marker>, "value">, AngleSliderMarkerContract {}

export function AngleSliderMarker({ value, className, ...rest }: AngleSliderMarkerProps) {
  return (
    <Ark.Marker
      {...rest}
      value={value}
      data-slot="angle-slider-marker"
      className={cn(
        "absolute inset-0 before:absolute before:top-[3.5%] before:left-1/2 before:size-[5%] before:-translate-x-1/2 before:rounded-full before:bg-default before:content-['']",
        className,
      )}
    />
  );
}
