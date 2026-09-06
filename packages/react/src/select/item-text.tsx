import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "@75neo/themes";

export interface SelectItemTextProps extends React.ComponentProps<typeof Ark.ItemText> {}

export function SelectItemText({ className, children, ...rest }: SelectItemTextProps) {
  return (
    <Ark.ItemText
      {...rest}
      data-slot="select-item-text"
      className={cn("min-w-0 flex-1 truncate", className)}
    >
      {children}
    </Ark.ItemText>
  );
}
