import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "@75neo/themes";

export interface SelectItemGroupProps extends React.ComponentProps<typeof Ark.ItemGroup> {}

export function SelectItemGroup({ className, children, ...rest }: SelectItemGroupProps) {
  return (
    <Ark.ItemGroup {...rest} data-slot="select-item-group" className={cn(className)}>
      {children}
    </Ark.ItemGroup>
  );
}
