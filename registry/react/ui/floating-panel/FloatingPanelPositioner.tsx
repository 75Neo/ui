import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelPositionerProps extends React.ComponentPropsWithRef<
  typeof Ark.Positioner
> {}

export default function FloatingPanelPositioner({
  className,
  children,
  ...props
}: FloatingPanelPositionerProps) {
  const styles = floatingPanel();

  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
