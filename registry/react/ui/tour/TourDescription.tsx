import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

export interface TourDescriptionProps extends React.ComponentPropsWithRef<typeof Ark.Description> {}

export default function TourDescription({ className, children, ...props }: TourDescriptionProps) {
  const styles = tour();

  return (
    <Ark.Description className={cn(styles.description(), className)} {...props}>
      {children}
    </Ark.Description>
  );
}
