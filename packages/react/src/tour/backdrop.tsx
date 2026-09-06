import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "@75neo/themes";

export interface TourBackdropProps extends React.ComponentProps<typeof Ark.Backdrop> {}

export function TourBackdrop({ className, ...rest }: TourBackdropProps) {
  return (
    <Ark.Backdrop
      {...rest}
      data-slot="tour-backdrop"
      className={cn("fixed inset-0 z-50 bg-inverted/40 backdrop-blur-[2px]", className)}
    />
  );
}
