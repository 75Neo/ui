import React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";
import { cn } from "cn";
import { pinInput } from "@/registry/shared/lib/pin-input.styles";

export interface PinInputLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function PinInputLabel({ className, children, ...props }: PinInputLabelProps) {
  const styles = pinInput();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
