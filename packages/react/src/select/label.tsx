import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "@75neo/themes";

export interface SelectLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function SelectLabel({ className, children, ...rest }: SelectLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="select-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
