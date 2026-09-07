import React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cn } from "cn";
import { switchRecipe, type SwitchSize } from "@/registry/shared/lib/switch.styles";

export interface SwitchProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: SwitchSize;
}

export default function Switch({ size = "md", className, children, ...props }: SwitchProps) {
  const styles = switchRecipe();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
