import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInputStyles as styles } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function NumberInputLabel({ className, children, ...props }: NumberInputLabelProps) {
  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
