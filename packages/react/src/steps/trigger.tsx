import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "@75neo/themes";

export interface StepsTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {
  children?: React.ReactNode;
}

export function StepsTrigger({ className, children, ...rest }: StepsTriggerProps) {
  return (
    <Ark.Trigger
      {...rest}
      data-slot="steps-trigger"
      className={cn(
        "flex min-w-0 cursor-pointer items-center gap-2.5 rounded-md outline-primary/25 focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </Ark.Trigger>
  );
}
