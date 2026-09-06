import type React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cva } from "class-variance-authority";
import { cn, progressColorData, progressDefaults } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressRange = cva(
  "h-full rounded-full transition-[width] duration-200 data-[orientation=vertical]:size-full data-[state=indeterminate]:w-1/3 data-[state=indeterminate]:animate-progress-sweep",
  {
    variants: { color: progressColorData.range },
    defaultVariants: progressDefaults,
  },
);

export interface ProgressRangeProps extends React.ComponentProps<typeof Ark.Range> {}

export function ProgressRange({ className, ...rest }: ProgressRangeProps) {
  const variants = useProgressVariants();

  return (
    <Ark.Range
      {...rest}
      data-slot="progress-range"
      className={cn(progressRange({ color: variants.color }), className)}
    />
  );
}
