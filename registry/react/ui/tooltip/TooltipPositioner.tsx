import React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";
import { cn } from "cn";
import { tooltip } from "@/registry/shared/lib/tooltip.styles";

export interface TooltipPositionerProps extends React.ComponentPropsWithRef<
  typeof Ark.Positioner
> {}

export default function TooltipPositioner({
  className,
  children,
  ...props
}: TooltipPositionerProps) {
  const styles = tooltip();

  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
