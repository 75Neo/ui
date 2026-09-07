import React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";
import { cn } from "cn";
import { pinInput } from "@/registry/shared/lib/pin-input.styles";

export interface PinInputProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function PinInput({ className, children, ...props }: PinInputProps) {
  const styles = pinInput();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
