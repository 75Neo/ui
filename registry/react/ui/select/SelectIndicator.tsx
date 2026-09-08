import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { selectStyles as styles } from "@/registry/shared/lib/select.styles";

export interface SelectIndicatorProps extends React.ComponentPropsWithRef<typeof Ark.Indicator> {}

export default function SelectIndicator({ className, children, ...props }: SelectIndicatorProps) {
  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
