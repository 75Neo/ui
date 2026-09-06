import type React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";
import { cn } from "@75neo/themes";

export interface HoverCardTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {
  children?: React.ReactNode;
}

export function HoverCardTrigger({ className, children, ...rest }: HoverCardTriggerProps) {
  return (
    <Ark.Trigger {...rest} data-slot="hover-card-trigger" className={cn(className)}>
      {children}
    </Ark.Trigger>
  );
}
