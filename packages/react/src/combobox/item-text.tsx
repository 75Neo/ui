import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "@75neo/themes";

export interface ComboboxItemTextProps extends React.ComponentProps<typeof Ark.ItemText> {}

export function ComboboxItemText({ className, children, ...rest }: ComboboxItemTextProps) {
  return (
    <Ark.ItemText
      {...rest}
      data-slot="combobox-item-text"
      className={cn("min-w-0 flex-1 truncate", className)}
    >
      {children}
    </Ark.ItemText>
  );
}
