import React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cn } from "cn";
import { switchRecipe, type SwitchSize, type Color } from "@/registry/shared/lib/switch.styles";

export interface SwitchProps extends Omit<React.ComponentPropsWithRef<typeof Ark.Root>, "color"> {
  color?: Color;
  size?: SwitchSize;
}

export default function Switch({ color, size = "md", className, children, ...props }: SwitchProps) {
  const styles = switchRecipe({ color });

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
