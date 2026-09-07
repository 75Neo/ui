import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInput } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function NumberInput({ className, children, ...props }: NumberInputProps) {
  const styles = numberInput();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
