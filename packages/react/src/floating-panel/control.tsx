import type React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "@75neo/themes";

export interface FloatingPanelControlProps extends React.ComponentProps<typeof Ark.Control> {
  children?: React.ReactNode;
}

export function FloatingPanelControl({ className, children, ...rest }: FloatingPanelControlProps) {
  return (
    <Ark.Control
      {...rest}
      data-slot="floating-panel-control"
      className={cn("ms-auto flex shrink-0 items-center gap-1", className)}
    >
      {children}
    </Ark.Control>
  );
}
