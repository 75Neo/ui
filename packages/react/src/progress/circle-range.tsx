import type React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cva } from "class-variance-authority";
import { cn, progressColorData, progressDefaults } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressCircleRange = cva(
  "fill-transparent transition-[stroke-dashoffset] duration-200 [stroke-linecap:round]",
  {
    variants: { color: progressColorData.circleRange },
    defaultVariants: progressDefaults,
  },
);

export interface ProgressCircleRangeProps extends React.ComponentProps<typeof Ark.CircleRange> {}

export function ProgressCircleRange({ className, ...rest }: ProgressCircleRangeProps) {
  const variants = useProgressVariants();

  return (
    <Ark.CircleRange
      {...rest}
      data-slot="progress-circle-range"
      className={cn(progressCircleRange({ color: variants.color }), className)}
    />
  );
}
