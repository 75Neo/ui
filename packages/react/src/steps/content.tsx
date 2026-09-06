import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cva } from "class-variance-authority";
import { cn, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsContent = cva("rounded-lg bg-muted text-toned", {
  variants: { size: stepsSizeData.content },
  defaultVariants: stepsDefaults,
});

export interface StepsContentProps extends React.ComponentProps<typeof Ark.Content> {
  children?: React.ReactNode;
}

export function StepsContent({ index, className, children, ...rest }: StepsContentProps) {
  const variants = useStepsVariants();

  return (
    <Ark.Content
      {...rest}
      index={index}
      data-slot="steps-content"
      className={cn(stepsContent({ size: variants.size }), className)}
    >
      {children}
    </Ark.Content>
  );
}
