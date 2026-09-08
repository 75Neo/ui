import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

export interface TourPositionerProps extends React.ComponentPropsWithRef<typeof Ark.Positioner> {}

export default function TourPositioner({ className, children, ...props }: TourPositionerProps) {
  const styles = tour();

  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
