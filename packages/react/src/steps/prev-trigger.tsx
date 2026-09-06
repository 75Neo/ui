import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cva } from "class-variance-authority";
import { cn, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsPrevTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-elevated font-medium text-default outline-primary/25 transition-colors hover:bg-accented/75 focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: { size: stepsSizeData.triggerButton },
    defaultVariants: stepsDefaults,
  },
);

export interface StepsPrevTriggerProps extends React.ComponentProps<typeof Ark.PrevTrigger> {
  children?: React.ReactNode;
}

export function StepsPrevTrigger({ className, children, ...rest }: StepsPrevTriggerProps) {
  const variants = useStepsVariants();

  return (
    <Ark.PrevTrigger
      {...rest}
      data-slot="steps-prev-trigger"
      className={cn(stepsPrevTrigger({ size: variants.size }), className)}
    >
      {children ?? "Back"}
    </Ark.PrevTrigger>
  );
}
