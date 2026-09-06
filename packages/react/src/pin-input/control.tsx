import type React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";
import { cva } from "class-variance-authority";
import { cn, pinInputDefaults, pinInputSizeData } from "@75neo/themes";
import { usePinInputVariants } from "./variants";

const pinInputControl = cva("flex items-center", {
  variants: { size: pinInputSizeData.control },
  defaultVariants: pinInputDefaults,
});

export interface PinInputControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function PinInputControl({ className, children, ...rest }: PinInputControlProps) {
  const variants = usePinInputVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="pin-input-control"
      className={cn(pinInputControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
