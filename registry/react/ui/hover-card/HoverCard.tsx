import React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";

export interface HoverCardProps extends React.ComponentProps<typeof Ark.Root> {}

export default function HoverCard({ children, ...props }: HoverCardProps) {
  return <Ark.Root {...props}>{children}</Ark.Root>;
}
