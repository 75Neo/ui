import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "@75neo/themes";

export interface ComboboxLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function ComboboxLabel({ className, children, ...rest }: ComboboxLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="combobox-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
