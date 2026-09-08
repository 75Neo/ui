import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelCloseTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.CloseTrigger
> {}

export default function FloatingPanelCloseTrigger({
  className,
  children,
  ...props
}: FloatingPanelCloseTriggerProps) {
  const styles = floatingPanel();

  return (
    <Ark.CloseTrigger className={cn(styles.closeTrigger(), className)} {...props}>
      {children}
    </Ark.CloseTrigger>
  );
}
