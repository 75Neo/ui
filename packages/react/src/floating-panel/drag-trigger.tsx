import type React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "@75neo/themes";

export interface FloatingPanelDragTriggerProps extends React.ComponentProps<
  typeof Ark.DragTrigger
> {
  children?: React.ReactNode;
}

export function FloatingPanelDragTrigger({
  className,
  children,
  ...rest
}: FloatingPanelDragTriggerProps) {
  return (
    <Ark.DragTrigger
      {...rest}
      data-slot="floating-panel-drag-trigger"
      className={cn("contents", className)}
    >
      {children}
    </Ark.DragTrigger>
  );
}
