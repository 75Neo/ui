import React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";
import { cn } from "cn";
import { hoverCardStyles as styles } from "@/registry/shared/lib/hover-card.styles";

export interface HoverCardPositionerProps extends React.ComponentPropsWithRef<
  typeof Ark.Positioner
> {}

export default function HoverCardPositioner({
  className,
  children,
  ...props
}: HoverCardPositionerProps) {
  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
