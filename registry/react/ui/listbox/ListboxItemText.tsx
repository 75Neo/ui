import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listboxStyles as styles } from "@/registry/shared/lib/listbox.styles";

export interface ListboxItemTextProps extends React.ComponentPropsWithRef<typeof Ark.ItemText> {}

export default function ListboxItemText({ className, children, ...props }: ListboxItemTextProps) {
  return (
    <Ark.ItemText className={cn(styles.itemText(), className)} {...props}>
      {children}
    </Ark.ItemText>
  );
}
