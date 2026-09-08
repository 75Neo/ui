import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelDragTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.DragTrigger
> {}

export default function FloatingPanelDragTrigger({
  className,
  children,
  ...props
}: FloatingPanelDragTriggerProps) {
  return (
    <Ark.DragTrigger className={cn(styles.dragTrigger(), className)} {...props}>
      {children}
    </Ark.DragTrigger>
  );
}
