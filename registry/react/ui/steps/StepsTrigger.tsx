import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

export interface StepsTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function StepsTrigger({ className, children, ...props }: StepsTriggerProps) {
  const styles = steps();

  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {children}
    </Ark.Trigger>
  );
}
