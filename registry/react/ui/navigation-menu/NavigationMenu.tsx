import React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cn } from "cn";
import {
  navigationMenuStyles as styles,
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
  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
