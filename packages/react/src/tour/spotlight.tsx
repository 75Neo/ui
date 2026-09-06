import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "@75neo/themes";

export interface TourSpotlightProps extends React.ComponentProps<typeof Ark.Spotlight> {}

export function TourSpotlight({ className, ...rest }: TourSpotlightProps) {
  return (
    <Ark.Spotlight
      {...rest}
      data-slot="tour-spotlight"
      className={cn("z-50 rounded-md ring-2 ring-inverted", className)}
    />
  );
}
