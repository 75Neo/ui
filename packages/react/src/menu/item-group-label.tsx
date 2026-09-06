import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cva } from "class-variance-authority";
import { cn, menuDefaults, menuSizeData } from "@75neo/themes";
import { useMenuVariants } from "./variants";

const menuItemGroupLabel = cva("font-medium text-dimmed select-none", {
  variants: { size: menuSizeData.groupLabel },
  defaultVariants: menuDefaults,
});

export interface MenuItemGroupLabelProps extends React.ComponentProps<typeof Ark.ItemGroupLabel> {}

export function MenuItemGroupLabel({ className, children, ...rest }: MenuItemGroupLabelProps) {
  const variants = useMenuVariants();

  return (
    <Ark.ItemGroupLabel
      {...rest}
      data-slot="menu-item-group-label"
      className={cn(menuItemGroupLabel(variants), className)}
    >
      {children}
    </Ark.ItemGroupLabel>
  );
}
