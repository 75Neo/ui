import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@75neo/themes";

export interface MenuIndicatorProps extends React.ComponentProps<typeof Ark.Indicator> {
  children?: React.ReactNode;
}

export function MenuIndicator({ className, children, ...rest }: MenuIndicatorProps) {
  return (
    <Ark.Indicator {...rest} data-slot="menu-indicator" className={cn(className)}>
      {children ?? <ChevronDown />}
    </Ark.Indicator>
  );
}
