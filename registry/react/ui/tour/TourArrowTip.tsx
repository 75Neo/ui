import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

export interface TourArrowTipProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ArrowTip>,
  "children"
> {}

export default function TourArrowTip({ className, ...props }: TourArrowTipProps) {
  const styles = tour();

  return <Ark.ArrowTip className={cn(styles.arrowTip(), className)} {...props} />;
}
