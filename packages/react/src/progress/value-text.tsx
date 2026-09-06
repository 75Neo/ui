import type React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cva } from "class-variance-authority";
import { cn, progressDefaults, progressSizeData } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressValueText = cva("text-dimmed tabular-nums", {
  variants: { size: progressSizeData.valueText },
  defaultVariants: progressDefaults,
});

export interface ProgressValueTextProps extends React.ComponentProps<typeof Ark.ValueText> {}

export function ProgressValueText({ className, children, ...rest }: ProgressValueTextProps) {
  const variants = useProgressVariants();

  return (
    <Ark.ValueText
      {...rest}
      data-slot="progress-value-text"
      className={cn(progressValueText({ size: variants.size }), className)}
    >
      {children}
    </Ark.ValueText>
  );
}
