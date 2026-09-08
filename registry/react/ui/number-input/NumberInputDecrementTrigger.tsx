import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInputStyles as styles } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputDecrementTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.DecrementTrigger
> {}

export default function NumberInputDecrementTrigger({
  className,
  children,
  ...props
}: NumberInputDecrementTriggerProps) {
  return (
    <Ark.DecrementTrigger className={cn(styles.decrementTrigger(), className)} {...props}>
      {children}
    </Ark.DecrementTrigger>
  );
}
