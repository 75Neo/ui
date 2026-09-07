import React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cn } from "cn";
import { navigationMenu } from "@/registry/shared/lib/navigation-menu.styles";

export interface NavigationMenuListProps extends React.ComponentPropsWithRef<typeof Ark.List> {}

export default function NavigationMenuList({
  className,
  children,
  ...props
}: NavigationMenuListProps) {
  const styles = navigationMenu();

  return (
    <Ark.List className={cn(styles.list(), className)} {...props}>
      {children}
    </Ark.List>
  );
}
