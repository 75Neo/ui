import type React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "@75neo/themes";

export interface ListboxItemTextProps extends React.ComponentProps<typeof Ark.ItemText> {}

export function ListboxItemText({ className, children, ...rest }: ListboxItemTextProps) {
  return (
    <Ark.ItemText
      {...rest}
      data-slot="listbox-item-text"
      className={cn("min-w-0 flex-1 truncate", className)}
    >
      {children}
    </Ark.ItemText>
  );
}
