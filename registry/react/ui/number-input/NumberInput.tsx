import React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cn } from "cn";
import { numberInput, type NumberInputSize } from "@/registry/shared/lib/number-input.styles";

export interface NumberInputProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: NumberInputSize;
}

export default function NumberInput({
  size = "md",
  className,
  children,
  ...props
}: NumberInputProps) {
  const styles = numberInput();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
