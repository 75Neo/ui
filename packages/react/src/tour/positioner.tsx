import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "@75neo/themes";

export interface TourPositionerProps extends React.ComponentProps<typeof Ark.Positioner> {
  children?: React.ReactNode;
}

export function TourPositioner({ className, children, ...rest }: TourPositionerProps) {
  return (
    <Ark.Positioner
      {...rest}
      data-slot="tour-positioner"
      className={cn(
        "z-50 data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=dialog]:m-auto data-[type=dialog]:flex data-[type=dialog]:items-center data-[type=dialog]:justify-center",
        className,
      )}
    >
      {children}
    </Ark.Positioner>
  );
}
