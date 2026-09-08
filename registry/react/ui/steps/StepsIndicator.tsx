import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

export interface StepsIndicatorProps extends React.ComponentPropsWithRef<typeof Ark.Indicator> {}

export default function StepsIndicator({ className, children, ...props }: StepsIndicatorProps) {
  const styles = steps();

  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
