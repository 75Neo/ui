import React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cn } from "cn";
import { radioGroup, type RadioGroupSize } from "@/registry/shared/lib/radio-group.styles";

export interface RadioGroupProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: RadioGroupSize;
}

export default function RadioGroup({
  size = "md",
  className,
  children,
  ...props
}: RadioGroupProps) {
  const styles = radioGroup();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
