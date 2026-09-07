import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

export interface MenuItemTextProps extends React.ComponentPropsWithRef<typeof Ark.ItemText> {}

export default function MenuItemText({ className, children, ...props }: MenuItemTextProps) {
  const styles = menu();

  return (
    <Ark.ItemText className={cn(styles.itemText(), className)} {...props}>
      {children}
    </Ark.ItemText>
  );
}
