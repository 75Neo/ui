import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxItemGroupLabelProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemGroupLabel
> {}

export default function ComboboxItemGroupLabel({
  className,
  children,
  ...props
}: ComboboxItemGroupLabelProps) {
  return (
    <Ark.ItemGroupLabel className={cn(styles.itemGroupLabel(), className)} {...props}>
      {children}
    </Ark.ItemGroupLabel>
  );
}
