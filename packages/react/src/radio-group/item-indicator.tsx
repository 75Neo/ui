import type React from "react";
import { cva } from "class-variance-authority";
import { cn, radioGroupDefaults, radioGroupSizeData } from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";

const radioGroupItemIndicator = cva(
  "rounded-full bg-default opacity-0 transition-opacity group-data-[state=checked]/control:opacity-100",
  {
    variants: { size: radioGroupSizeData.indicator },
    defaultVariants: radioGroupDefaults,
  },
);

export interface RadioGroupItemIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function RadioGroupItemIndicator({ className, ...rest }: RadioGroupItemIndicatorProps) {
  const variants = useRadioGroupVariants();

  return (
    <span
      {...rest}
      data-slot="radio-group-item-indicator"
      className={cn(radioGroupItemIndicator(variants), className)}
    />
  );
}
