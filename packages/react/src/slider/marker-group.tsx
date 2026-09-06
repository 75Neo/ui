import type React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "@75neo/themes";

export interface SliderMarkerGroupProps extends React.ComponentProps<typeof Ark.MarkerGroup> {}

export function SliderMarkerGroup({ className, children, ...rest }: SliderMarkerGroupProps) {
  return (
    <Ark.MarkerGroup
      {...rest}
      data-slot="slider-marker-group"
      className={cn(
        "group-data-[orientation=horizontal]/slider:mt-1 group-data-[orientation=horizontal]/slider:w-full group-data-[orientation=vertical]/slider:ms-2 group-data-[orientation=vertical]/slider:h-full",
        className,
      )}
    >
      {children}
    </Ark.MarkerGroup>
  );
}
