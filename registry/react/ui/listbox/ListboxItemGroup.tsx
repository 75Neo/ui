import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listboxStyles as styles } from "@/registry/shared/lib/listbox.styles";

export interface ListboxItemGroupProps extends React.ComponentPropsWithRef<typeof Ark.ItemGroup> {}

export default function ListboxItemGroup({ className, children, ...props }: ListboxItemGroupProps) {
  return (
    <Ark.ItemGroup className={cn(styles.itemGroup(), className)} {...props}>
      {children}
    </Ark.ItemGroup>
  );
}
