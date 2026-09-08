import React from "react";
import { Toggle as Ark } from "@ark-ui/react/toggle";
import { cn } from "cn";
import { toggle, type ToggleSize, type Intent } from "@/registry/shared/lib/toggle.styles";

export interface ToggleProps extends Omit<React.ComponentPropsWithRef<typeof Ark.Root>, "color"> {
  color?: Intent;
  size?: ToggleSize;
}

export default function Toggle({ color, size = "md", className, children, ...props }: ToggleProps) {
  const styles = toggle({ color });

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
