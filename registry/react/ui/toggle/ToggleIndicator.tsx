import React from "react";
import { Toggle as Ark } from "@ark-ui/react/toggle";
import { cn } from "cn";
import { toggleStyles as styles } from "@/registry/shared/lib/toggle.styles";

export interface ToggleIndicatorProps extends React.ComponentPropsWithRef<typeof Ark.Indicator> {}

export default function ToggleIndicator({ className, children, ...props }: ToggleIndicatorProps) {
  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
