import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputIncrementTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.IncrementTrigger
> {}

export default function NumberInputIncrementTrigger({
  className,
  children,
  ...props
}: NumberInputIncrementTriggerProps) {
  const styles = numberInput();

  return (
    <Ark.IncrementTrigger className={cn(styles.incrementTrigger(), className)} {...props}>
      {children}
    </Ark.IncrementTrigger>
  );
}
