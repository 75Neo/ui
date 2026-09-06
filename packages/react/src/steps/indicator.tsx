import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cva } from "class-variance-authority";
import { cn, stepsColorData, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsIndicator = cva(
  "group/steps-indicator inline-flex shrink-0 items-center justify-center rounded-full ring-2 ring-default ring-inset [&>svg]:size-[1em]",
  {
    variants: {
      size: stepsSizeData.indicator,
      color: stepsColorData.indicator,
    },
    defaultVariants: stepsDefaults,
  },
);

export interface StepsIndicatorProps extends React.ComponentProps<typeof Ark.Indicator> {
  children?: React.ReactNode;
}

export function StepsIndicator({ className, children, ...rest }: StepsIndicatorProps) {
  const variants = useStepsVariants();

  return (
    <Ark.Indicator
      {...rest}
      data-slot="steps-indicator"
      className={cn(stepsIndicator(variants), className)}
    >
      {children}
    </Ark.Indicator>
  );
}
