import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

export interface TourControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function TourControl({ className, children, ...props }: TourControlProps) {
  const styles = tour();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
