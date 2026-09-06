import type React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn, type SliderMarkerProps as SliderMarkerContract } from "@75neo/themes";

export interface SliderMarkerProps
  extends Omit<React.ComponentProps<typeof Ark.Marker>, "value">, SliderMarkerContract {}

export function SliderMarker({ value, className, children, ...rest }: SliderMarkerProps) {
  return (
    <Ark.Marker
      {...rest}
      value={value}
      data-slot="slider-marker"
      className={cn(
        "text-xs text-dimmed tabular-nums data-[state=under-value]:text-muted",
        className,
      )}
    >
      {children}
    </Ark.Marker>
  );
}
