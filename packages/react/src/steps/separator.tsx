import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cva } from "class-variance-authority";
import { cn, stepsColorData, stepsDefaults } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsSeparator = cva(
  "h-0.5 min-w-4 flex-1 rounded-full bg-muted data-[orientation=vertical]:hidden",
  {
    variants: { color: stepsColorData.separator },
    defaultVariants: stepsDefaults,
  },
);

export interface StepsSeparatorProps extends React.ComponentProps<typeof Ark.Separator> {}

export function StepsSeparator({ className, ...rest }: StepsSeparatorProps) {
  const variants = useStepsVariants();

  return (
    <Ark.Separator
      {...rest}
      data-slot="steps-separator"
      className={cn(stepsSeparator({ color: variants.color }), className)}
    />
  );
}
