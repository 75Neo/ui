import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menuStyles as styles } from "@/registry/shared/lib/menu.styles";

export interface MenuItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function MenuItem({ className, children, ...props }: MenuItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
