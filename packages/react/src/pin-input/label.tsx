import type React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";
import { cn } from "@75neo/themes";

export interface PinInputLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function PinInputLabel({ className, children, ...rest }: PinInputLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="pin-input-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
