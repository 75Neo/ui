import type React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "@75neo/themes";

export interface NumberInputLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function NumberInputLabel({ className, children, ...rest }: NumberInputLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="number-input-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
