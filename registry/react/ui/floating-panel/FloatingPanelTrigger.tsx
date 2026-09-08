import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";

export interface FloatingPanelTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.Trigger
> {}

export default function FloatingPanelTrigger({ children, ...props }: FloatingPanelTriggerProps) {
  return <Ark.Trigger {...props}>{children}</Ark.Trigger>;
}
