import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";

export interface FloatingPanelProps extends React.ComponentProps<typeof Ark.Root> {}

export default function FloatingPanel({ children, ...props }: FloatingPanelProps) {
  return <Ark.Root {...props}>{children}</Ark.Root>;
}
