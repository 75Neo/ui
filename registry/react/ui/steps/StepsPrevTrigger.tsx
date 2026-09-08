import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

export interface StepsPrevTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.PrevTrigger
> {}

export default function StepsPrevTrigger({ className, children, ...props }: StepsPrevTriggerProps) {
  return (
    <Ark.PrevTrigger className={cn(styles.prevTrigger(), className)} {...props}>
      {children}
    </Ark.PrevTrigger>
  );
}
