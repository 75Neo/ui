import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectIndicatorProps extends React.ComponentPropsWithRef<typeof Ark.Indicator> {}

export default function SelectIndicator({ className, children, ...props }: SelectIndicatorProps) {
  const styles = select();

  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
