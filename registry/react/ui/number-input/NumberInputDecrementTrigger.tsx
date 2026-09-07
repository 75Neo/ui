import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputDecrementTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.DecrementTrigger
> {}

export default function NumberInputDecrementTrigger({
  className,
  children,
  ...props
}: NumberInputDecrementTriggerProps) {
  const styles = numberInput();

  return (
    <Ark.DecrementTrigger className={cn(styles.decrementTrigger(), className)} {...props}>
      {children}
    </Ark.DecrementTrigger>
  );
}
