import type React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cn } from "@75neo/themes";

export interface DialogTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {
  children?: React.ReactNode;
}

export function DialogTrigger({ className, children, ...rest }: DialogTriggerProps) {
  return (
    <Ark.Trigger {...rest} data-slot="dialog-trigger" className={cn(className)}>
      {children}
    </Ark.Trigger>
  );
}
