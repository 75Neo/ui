import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "@75neo/themes";

export interface TourControlProps extends React.ComponentProps<typeof Ark.Control> {
  children?: React.ReactNode;
}

export function TourControl({ className, children, ...rest }: TourControlProps) {
  return (
    <Ark.Control
      {...rest}
      data-slot="tour-control"
      className={cn("mt-2 flex items-center gap-2", className)}
    >
      {children}
    </Ark.Control>
  );
}
