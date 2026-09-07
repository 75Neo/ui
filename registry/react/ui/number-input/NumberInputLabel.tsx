import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function NumberInputLabel({ className, children, ...props }: NumberInputLabelProps) {
  const styles = numberInput();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
