import React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";
import { cn } from "cn";
import { checkbox, type CheckboxSize } from "@/registry/shared/lib/checkbox.styles";

export interface CheckboxProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: CheckboxSize;
}

export default function Checkbox({ size = "md", className, children, ...props }: CheckboxProps) {
  const styles = checkbox();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
