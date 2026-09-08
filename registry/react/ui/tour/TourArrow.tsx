import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

export interface TourArrowProps extends React.ComponentPropsWithRef<typeof Ark.Arrow> {}

export default function TourArrow({ className, children, ...props }: TourArrowProps) {
  const styles = tour();

  return (
    <Ark.Arrow className={cn(styles.arrow(), className)} {...props}>
      {children}
    </Ark.Arrow>
  );
}
