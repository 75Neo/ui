import React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cn } from "cn";
import { navigationMenuStyles as styles } from "@/registry/shared/lib/navigation-menu.styles";

export interface NavigationMenuItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function NavigationMenuItem({
  className,
  children,
  ...props
}: NavigationMenuItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
