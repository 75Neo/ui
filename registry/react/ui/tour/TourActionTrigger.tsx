import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

export interface TourActionTriggerProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ActionTrigger>,
  "children"
> {}

export default function TourActionTrigger({ className, ...props }: TourActionTriggerProps) {
  const styles = tour();

  return <Ark.ActionTrigger className={cn(styles.actionTrigger(), className)} {...props} />;
}
