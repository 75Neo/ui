import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxListProps extends React.ComponentPropsWithRef<typeof Ark.List> {}

export default function ComboboxList({ className, children, ...props }: ComboboxListProps) {
  return (
    <Ark.List className={cn(styles.list(), className)} {...props}>
      {children}
    </Ark.List>
  );
}
