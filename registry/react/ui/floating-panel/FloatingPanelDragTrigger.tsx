import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelDragTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.DragTrigger
> {}

export default function FloatingPanelDragTrigger({
  className,
  children,
  ...props
}: FloatingPanelDragTriggerProps) {
  const styles = floatingPanel();

  return (
    <Ark.DragTrigger className={cn(styles.dragTrigger(), className)} {...props}>
      {children}
    </Ark.DragTrigger>
  );
}
