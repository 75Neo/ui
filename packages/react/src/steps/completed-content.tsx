import type React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cva } from "class-variance-authority";
import { cn, stepsDefaults, stepsSizeData } from "@75neo/themes";
import { useStepsVariants } from "./variants";

const stepsCompletedContent = cva("rounded-lg bg-muted text-center font-medium text-highlighted", {
  variants: { size: stepsSizeData.content },
  defaultVariants: stepsDefaults,
});

export interface StepsCompletedContentProps extends React.ComponentProps<
  typeof Ark.CompletedContent
> {
  children?: React.ReactNode;
}

export function StepsCompletedContent({
  className,
  children,
  ...rest
}: StepsCompletedContentProps) {
  const variants = useStepsVariants();

  return (
    <Ark.CompletedContent
      {...rest}
      data-slot="steps-completed-content"
      className={cn(stepsCompletedContent({ size: variants.size }), className)}
    >
      {children}
    </Ark.CompletedContent>
  );
}
