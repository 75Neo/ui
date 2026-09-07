import React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";
import { cn } from "cn";
import { pinInput } from "@/registry/shared/lib/pin-input.styles";

export interface PinInputControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function PinInputControl({ className, children, ...props }: PinInputControlProps) {
  const styles = pinInput();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
