import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

export interface StepsNextTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.NextTrigger
> {}

export default function StepsNextTrigger({ className, children, ...props }: StepsNextTriggerProps) {
  const styles = steps();

  return (
    <Ark.NextTrigger className={cn(styles.nextTrigger(), className)} {...props}>
      {children}
    </Ark.NextTrigger>
  );
}
