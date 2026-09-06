import type React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cva } from "class-variance-authority";
import { cn, progressDefaults, progressSizeData } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressCircle = cva("shrink-0", {
  variants: { size: progressSizeData.circle },
  defaultVariants: progressDefaults,
});

export interface ProgressCircleProps extends React.ComponentProps<typeof Ark.Circle> {
  children?: React.ReactNode;
}

export function ProgressCircle({ className, children, ...rest }: ProgressCircleProps) {
  const variants = useProgressVariants();

  return (
    <Ark.Circle
      {...rest}
      data-slot="progress-circle"
      className={cn(progressCircle({ size: variants.size }), className)}
    >
      {children}
    </Ark.Circle>
  );
}
