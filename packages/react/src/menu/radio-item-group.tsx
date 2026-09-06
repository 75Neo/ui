import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "@75neo/themes";

export interface MenuRadioItemGroupProps extends React.ComponentProps<typeof Ark.RadioItemGroup> {
  children?: React.ReactNode;
}

export function MenuRadioItemGroup({ className, children, ...rest }: MenuRadioItemGroupProps) {
  return (
    <Ark.RadioItemGroup
      {...rest}
      data-slot="menu-radio-item-group"
      className={cn("flex flex-col", className)}
    >
      {children}
    </Ark.RadioItemGroup>
  );
}
