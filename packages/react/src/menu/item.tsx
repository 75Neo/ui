import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cva } from "class-variance-authority";
import {
  cn,
  menuDefaults,
  menuItemCompoundData,
  menuSizeData,
  menuRowValue,
  type MenuItemProps as MenuItemContract,
} from "@75neo/themes";
import { useMenuVariants } from "./variants";
import { Face } from "./face";

const menuItem = cva(
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

export interface MenuItemProps
  extends
    Omit<React.ComponentProps<typeof Ark.Item>, "value" | "children">,
    MenuItemContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function MenuItem({ row, className, children, ...rest }: MenuItemProps) {
  const variants = useMenuVariants();
  const item = (
    <Ark.Item
      {...rest}
      value={menuRowValue(row, 0)}
      disabled={row.disabled}
      onSelect={row.onSelect}
      closeOnSelect={row.closeOnSelect}
      data-slot="menu-item"
      className={cn(menuItem(variants), className)}
    >
      {children ?? <Face row={row} />}
    </Ark.Item>
  );

  /*
   * A link row is the anchor itself rather than an anchor inside a row, so the whole
   * width is clickable and a middle click opens a tab. `asChild` is what moves Ark's
   * own props onto it, which means the classes have to move with them.
   */
  if (row.href != null && children == null) {
    return (
      <Ark.Item
        value={menuRowValue(row, 0)}
        disabled={row.disabled}
        onSelect={row.onSelect}
        closeOnSelect={row.closeOnSelect}
        asChild
      >
        <a
          href={row.href}
          target={row.target}
          data-slot="menu-item"
          className={cn(menuItem(variants), className)}
        >
          <Face row={row} />
        </a>
      </Ark.Item>
    );
  }

  return item;
}
