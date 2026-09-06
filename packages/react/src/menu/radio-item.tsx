import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cva } from "class-variance-authority";
import { cn, menuDefaults, menuItemCompoundData, menuSizeData } from "@75neo/themes";
import { useMenuVariants } from "./variants";

const menuRadioItem = cva(
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

export interface MenuRadioItemProps extends Omit<
  React.ComponentProps<typeof Ark.RadioItem>,
  "children"
> {
  children?: React.ReactNode;
}

export function MenuRadioItem({ className, children, ...rest }: MenuRadioItemProps) {
  const variants = useMenuVariants();

  return (
    <Ark.RadioItem
      {...rest}
      data-slot="menu-radio-item"
      className={cn(menuRadioItem(variants), className)}
    >
      {children}
    </Ark.RadioItem>
  );
}
