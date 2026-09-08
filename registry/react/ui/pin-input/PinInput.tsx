import React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";
import { cn } from "cn";
import { pinInput, type PinInputSize } from "@/registry/shared/lib/pin-input.styles";

export interface PinInputProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: PinInputSize;
}

export default function PinInput({ size = "md", className, children, ...props }: PinInputProps) {
  const styles = pinInput();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
