import type React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "@75neo/themes";

export interface DrawerTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {
  children?: React.ReactNode;
}

export function DrawerTrigger({ className, children, ...rest }: DrawerTriggerProps) {
  return (
    <Ark.Trigger {...rest} data-slot="drawer-trigger" className={cn(className)}>
      {children}
    </Ark.Trigger>
  );
}
