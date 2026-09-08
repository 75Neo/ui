import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelPositionerProps extends React.ComponentPropsWithRef<
  typeof Ark.Positioner
> {}

export default function FloatingPanelPositioner({
  className,
  children,
  ...props
}: FloatingPanelPositionerProps) {
  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
