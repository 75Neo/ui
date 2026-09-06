import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "@75neo/themes";

export interface MenuItemGroupProps extends React.ComponentProps<typeof Ark.ItemGroup> {}

export function MenuItemGroup({ className, children, ...rest }: MenuItemGroupProps) {
  return (
    <Ark.ItemGroup {...rest} data-slot="menu-item-group" className={cn("flex flex-col", className)}>
      {children}
    </Ark.ItemGroup>
  );
}
