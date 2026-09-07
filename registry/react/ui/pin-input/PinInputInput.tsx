import React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";
import { cn } from "cn";
import { pinInput } from "@/registry/shared/lib/pin-input.styles";

export interface PinInputInputProps extends React.ComponentPropsWithRef<typeof Ark.Input> {}

export default function PinInputInput({ className, ...props }: PinInputInputProps) {
  const styles = pinInput();

  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
