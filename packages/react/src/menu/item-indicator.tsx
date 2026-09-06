import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn, menuDefaults, menuSizeData } from "@75neo/themes";
import { useMenuVariants } from "./variants";

const menuItemIndicator = cva("ms-auto shrink-0 [&>svg]:size-full", {
  variants: { size: menuSizeData.itemIndicator },
  defaultVariants: menuDefaults,
});

export interface MenuItemIndicatorProps extends React.ComponentProps<typeof Ark.ItemIndicator> {}

export function MenuItemIndicator({ className, children, ...rest }: MenuItemIndicatorProps) {
  const variants = useMenuVariants();

  return (
    <Ark.ItemIndicator
      {...rest}
      data-slot="menu-item-indicator"
      className={cn(menuItemIndicator(variants), className)}
    >
      {children ?? <Check />}
    </Ark.ItemIndicator>
  );
}
