import React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cn } from "cn";
import { switchStyles as styles } from "@/registry/shared/lib/switch.styles";

export interface SwitchControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function SwitchControl({ className, children, ...props }: SwitchControlProps) {
  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
