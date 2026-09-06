import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "@75neo/themes";

export interface MenuItemTextProps extends React.ComponentProps<typeof Ark.ItemText> {}

export function MenuItemText({ className, children, ...rest }: MenuItemTextProps) {
  return (
    <Ark.ItemText
      {...rest}
      data-slot="menu-item-text"
      className={cn("min-w-0 flex-1 truncate", className)}
    >
      {children}
    </Ark.ItemText>
  );
}
