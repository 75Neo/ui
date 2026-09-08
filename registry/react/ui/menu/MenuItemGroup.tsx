import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menuStyles as styles } from "@/registry/shared/lib/menu.styles";

export interface MenuItemGroupProps extends React.ComponentPropsWithRef<typeof Ark.ItemGroup> {}

export default function MenuItemGroup({ className, children, ...props }: MenuItemGroupProps) {
  return (
    <Ark.ItemGroup className={cn(styles.itemGroup(), className)} {...props}>
      {children}
    </Ark.ItemGroup>
  );
}
