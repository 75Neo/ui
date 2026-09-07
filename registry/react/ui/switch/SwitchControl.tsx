import React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cn } from "cn";
import { switchRecipe } from "@/registry/shared/lib/switch.styles";

export interface SwitchControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function SwitchControl({ className, children, ...props }: SwitchControlProps) {
  const styles = switchRecipe();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
