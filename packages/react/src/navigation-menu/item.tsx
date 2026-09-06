import type React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import {
  cn,
  navigationMenuDefaults,
  navigationMenuOrientationData,
  type NavigationMenuItemProps as NavigationMenuItemContract,
} from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuItem = cva("relative flex min-w-0 shrink-0", {
  variants: { orientation: navigationMenuOrientationData.item },
  defaultVariants: navigationMenuDefaults,
});

export interface NavigationMenuItemProps
  extends Omit<React.ComponentProps<typeof Ark.Item>, "value">, NavigationMenuItemContract {}

export function NavigationMenuItem({
  value,
  disabled,
  className,
  children,
  ...rest
}: NavigationMenuItemProps) {
  const variants = useNavigationMenuVariants();

  return (
    <Ark.Item
      {...rest}
      value={value}
      disabled={disabled}
      data-slot="navigation-menu-item"
      className={cn(navigationMenuItem(variants), className)}
    >
      {children}
    </Ark.Item>
  );
}
