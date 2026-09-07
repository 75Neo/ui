import React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cn } from "cn";
import { switchRecipe } from "@/registry/shared/lib/switch.styles";

export interface SwitchLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function SwitchLabel({ className, children, ...props }: SwitchLabelProps) {
  const styles = switchRecipe();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
