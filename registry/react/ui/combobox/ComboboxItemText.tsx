import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxItemTextProps extends React.ComponentPropsWithRef<typeof Ark.ItemText> {}

export default function ComboboxItemText({ className, children, ...props }: ComboboxItemTextProps) {
  return (
    <Ark.ItemText className={cn(styles.itemText(), className)} {...props}>
      {children}
    </Ark.ItemText>
  );
}
