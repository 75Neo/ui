import type React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "@75neo/themes";

export interface PopoverTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {
  children?: React.ReactNode;
}

export function PopoverTrigger({ className, children, ...rest }: PopoverTriggerProps) {
  return (
    <Ark.Trigger {...rest} data-slot="popover-trigger" className={cn(className)}>
      {children}
    </Ark.Trigger>
  );
}
