import React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";
import { cn } from "cn";
import { checkbox, type CheckboxSize, type Color } from "@/registry/shared/lib/checkbox.styles";

export interface CheckboxProps extends Omit<React.ComponentPropsWithRef<typeof Ark.Root>, "color"> {
  color?: Color;
  size?: CheckboxSize;
}

export default function Checkbox({
  color,
  size = "md",
  className,
  children,
  ...props
}: CheckboxProps) {
  const styles = checkbox({ color });

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
