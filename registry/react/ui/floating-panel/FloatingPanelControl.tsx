import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelControlProps extends React.ComponentPropsWithRef<
  typeof Ark.Control
> {}

export default function FloatingPanelControl({
  className,
  children,
  ...props
}: FloatingPanelControlProps) {
  const styles = floatingPanel();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
