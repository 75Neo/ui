import type React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "@75neo/themes";

export interface ListboxLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function ListboxLabel({ className, children, ...rest }: ListboxLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="listbox-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
