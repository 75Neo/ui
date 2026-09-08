import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menuStyles as styles } from "@/registry/shared/lib/menu.styles";

export interface MenuItemGroupLabelProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemGroupLabel
> {}

export default function MenuItemGroupLabel({
  className,
  children,
  ...props
}: MenuItemGroupLabelProps) {
  return (
    <Ark.ItemGroupLabel className={cn(styles.itemGroupLabel(), className)} {...props}>
      {children}
    </Ark.ItemGroupLabel>
  );
}
