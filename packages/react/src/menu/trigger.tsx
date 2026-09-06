import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "@75neo/themes";

export interface MenuTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {
  children?: React.ReactNode;
}

export function MenuTrigger({ className, children, ...rest }: MenuTriggerProps) {
  return (
    <Ark.Trigger {...rest} data-slot="menu-trigger" className={cn(className)}>
      {children}
    </Ark.Trigger>
  );
}
