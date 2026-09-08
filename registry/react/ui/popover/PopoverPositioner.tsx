import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "cn";
import { popoverStyles as styles } from "@/registry/shared/lib/popover.styles";

export interface PopoverPositionerProps extends React.ComponentPropsWithRef<
  typeof Ark.Positioner
> {}

export default function PopoverPositioner({
  className,
  children,
  ...props
}: PopoverPositionerProps) {
  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
