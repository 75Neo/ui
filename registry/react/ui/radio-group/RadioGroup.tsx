import React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cn } from "cn";
import {
  radioGroup,
  type RadioGroupSize,
  type Color,
} from "@/registry/shared/lib/radio-group.styles";

export interface RadioGroupProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Root>,
  "color"
> {
  color?: Color;
  size?: RadioGroupSize;
}

export default function RadioGroup({
  size = "md",
  color,
  className,
  children,
  ...props
}: RadioGroupProps) {
  const styles = radioGroup({ color });

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
