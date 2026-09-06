import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cva } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import {
  cn,
  menuDefaults,
  menuItemCompoundData,
  menuSizeData,
  type MenuTriggerItemProps as MenuTriggerItemContract,
} from "@75neo/themes";
import { useMenuVariants } from "./variants";
import { Face } from "./face";

const menuTriggerItem = cva(
  "flex cursor-pointer items-center rounded-md text-toned no-underline outline-none select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: menuSizeData.item,
    },
    compoundVariants: menuItemCompoundData,
    defaultVariants: menuDefaults,
  },
);

export interface MenuTriggerItemProps
  extends
    Omit<React.ComponentProps<typeof Ark.TriggerItem>, "children">,
    MenuTriggerItemContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function MenuTriggerItem({
  row,
  trailingIcon,
  className,
  children,
  ...rest
}: MenuTriggerItemProps) {
  const variants = useMenuVariants();

  return (
    <Ark.TriggerItem
      {...rest}
      data-slot="menu-trigger-item"
      className={cn(menuTriggerItem(variants), className)}
    >
      {children ?? <Face row={row} />}
      <span
        data-slot="menu-trailing-icon"
        className={cn(
          "ms-auto shrink-0 text-dimmed [&>svg]:size-full",
          menuSizeData.trailingIcon[variants.size],
        )}
      >
        {trailingIcon ?? <ChevronRight />}
      </span>
    </Ark.TriggerItem>
  );
}
