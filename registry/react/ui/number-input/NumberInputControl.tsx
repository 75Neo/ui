import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function NumberInputControl({
  className,
  children,
  ...props
}: NumberInputControlProps) {
  const styles = numberInput();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
