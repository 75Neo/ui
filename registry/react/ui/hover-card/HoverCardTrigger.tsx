import React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";

export interface HoverCardTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function HoverCardTrigger({ children, ...props }: HoverCardTriggerProps) {
  return <Ark.Trigger {...props}>{children}</Ark.Trigger>;
}
