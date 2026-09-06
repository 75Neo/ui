import type React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cva } from "class-variance-authority";
import { cn, progressDefaults, progressSizeData } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressLabel = cva("font-medium text-highlighted", {
  variants: { size: progressSizeData.label },
  defaultVariants: progressDefaults,
});

export interface ProgressLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function ProgressLabel({ className, children, ...rest }: ProgressLabelProps) {
  const variants = useProgressVariants();

  return (
    <Ark.Label
      {...rest}
      data-slot="progress-label"
      className={cn(progressLabel({ size: variants.size }), className)}
    >
      {children}
    </Ark.Label>
  );
}
