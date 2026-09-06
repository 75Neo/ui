import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cva } from "class-variance-authority";
import { cn, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsNextTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-inverted font-medium text-inverted outline-primary/25 transition-colors hover:bg-inverted/90 focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: { size: stepsSizeData.triggerButton },
    defaultVariants: stepsDefaults,
  },
);

export interface StepsNextTriggerProps extends React.ComponentProps<typeof Ark.NextTrigger> {
  children?: React.ReactNode;
}

export function StepsNextTrigger({ className, children, ...rest }: StepsNextTriggerProps) {
  const variants = useStepsVariants();

  return (
    <Ark.NextTrigger
      {...rest}
      data-slot="steps-next-trigger"
      className={cn(stepsNextTrigger({ size: variants.size }), className)}
    >
      {children ?? "Next"}
    </Ark.NextTrigger>
  );
}
