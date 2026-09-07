import React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cn } from "cn";
import {
  navigationMenu,
  type NavigationMenuSize,
} from "@/registry/shared/lib/navigation-menu.styles";

export interface NavigationMenuProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: NavigationMenuSize;
}

export default function NavigationMenu({
  size = "md",
  className,
  children,
  ...props
}: NavigationMenuProps) {
  const styles = navigationMenu();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
