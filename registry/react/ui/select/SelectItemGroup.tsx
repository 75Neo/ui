import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { selectStyles as styles } from "@/registry/shared/lib/select.styles";

export interface SelectItemGroupProps extends React.ComponentPropsWithRef<typeof Ark.ItemGroup> {}

export default function SelectItemGroup({ className, children, ...props }: SelectItemGroupProps) {
  return (
    <Ark.ItemGroup className={cn(styles.itemGroup(), className)} {...props}>
      {children}
    </Ark.ItemGroup>
  );
}
