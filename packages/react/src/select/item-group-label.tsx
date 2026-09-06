import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "@75neo/themes";

export interface SelectItemGroupLabelProps extends React.ComponentProps<
  typeof Ark.ItemGroupLabel
> {}

export function SelectItemGroupLabel({ className, children, ...rest }: SelectItemGroupLabelProps) {
  return (
    <Ark.ItemGroupLabel {...rest} data-slot="select-item-group-label" className={cn(className)}>
      {children}
    </Ark.ItemGroupLabel>
  );
}
