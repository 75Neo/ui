import React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";
import { cn } from "cn";
import { checkbox } from "@/registry/shared/lib/checkbox.styles";

export interface CheckboxIndicatorProps extends React.ComponentPropsWithRef<typeof Ark.Indicator> {}

export default function CheckboxIndicator({
  className,
  children,
  ...props
}: CheckboxIndicatorProps) {
  const styles = checkbox();

  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
