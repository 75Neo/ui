import type React from "react";
import { NavigationMenu as Ark } from "@ark-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { cn, navigationMenuDefaults, navigationMenuOrientationData } from "@75neo/themes";
import { useNavigationMenuVariants } from "./variants";

const navigationMenuList = cva("flex min-w-0 items-center gap-1", {
  variants: { orientation: navigationMenuOrientationData.list },
  defaultVariants: navigationMenuDefaults,
});

export interface NavigationMenuListProps extends React.ComponentProps<typeof Ark.List> {}

export function NavigationMenuList({ className, children, ...rest }: NavigationMenuListProps) {
  const variants = useNavigationMenuVariants();

  return (
    <Ark.List
      {...rest}
      data-slot="navigation-menu-list"
      className={cn(navigationMenuList(variants), className)}
    >
      {children}
    </Ark.List>
  );
}
