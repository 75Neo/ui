import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "@75neo/themes";

export interface MenuContextTriggerProps extends React.ComponentProps<typeof Ark.ContextTrigger> {
  children?: React.ReactNode;
}

export function MenuContextTrigger({ className, children, ...rest }: MenuContextTriggerProps) {
  return (
    <Ark.ContextTrigger {...rest} data-slot="menu-context-trigger" className={cn(className)}>
      {children}
    </Ark.ContextTrigger>
  );
}
