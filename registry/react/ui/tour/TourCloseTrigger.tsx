import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

export interface TourCloseTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.CloseTrigger
> {}

export default function TourCloseTrigger({ className, children, ...props }: TourCloseTriggerProps) {
  const styles = tour();

  return (
    <Ark.CloseTrigger className={cn(styles.closeTrigger(), className)} {...props}>
      {children}
    </Ark.CloseTrigger>
  );
}
