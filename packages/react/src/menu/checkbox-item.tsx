import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import {
  cn,
  menuDefaults,
  menuItemCompoundData,
  menuSizeData,
  menuRowValue,
  type MenuCheckboxItemProps as MenuCheckboxItemContract,
} from "@75neo/themes";
import { useMenuVariants } from "./variants";
import { Face } from "./face";
import { MenuItemIndicator } from "./item-indicator";

const menuCheckboxItem = cva(
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

export interface MenuCheckboxItemProps
  extends
    Omit<React.ComponentProps<typeof Ark.CheckboxItem>, "value" | "checked" | "children">,
    MenuCheckboxItemContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function MenuCheckboxItem({
  row,
  checkedIcon,
  className,
  children,
  ...rest
}: MenuCheckboxItemProps) {
  const variants = useMenuVariants();

  return (
    <Ark.CheckboxItem
      {...rest}
      value={menuRowValue(row, 0)}
      checked={row.checked ?? false}
      onCheckedChange={row.onCheckedChange}
      disabled={row.disabled}
      closeOnSelect={row.closeOnSelect}
      data-slot="menu-item"
      className={cn(menuCheckboxItem(variants), className)}
    >
      {children ?? <Face row={row} />}
      <MenuItemIndicator>{checkedIcon ?? <Check />}</MenuItemIndicator>
    </Ark.CheckboxItem>
  );
}
