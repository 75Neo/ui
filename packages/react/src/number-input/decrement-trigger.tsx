import type React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cva } from "class-variance-authority";
import { Minus } from "lucide-react";
import {
  cn,
  numberInputDefaults,
  numberInputOrientationData,
  numberInputSizeData,
} from "@75neo/themes";
import { useNumberInputVariants } from "./variants";

const numberInputDecrementTrigger = cva(
  "inline-flex cursor-pointer items-center justify-center text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent",
  {
    variants: {
      size: numberInputSizeData.decrementTrigger,
      orientation: numberInputOrientationData.decrementTrigger,
    },
    defaultVariants: numberInputDefaults,
  },
);

export interface NumberInputDecrementTriggerProps extends React.ComponentProps<
  typeof Ark.DecrementTrigger
> {}

export function NumberInputDecrementTrigger({
  className,
  children,
  ...rest
}: NumberInputDecrementTriggerProps) {
  const variants = useNumberInputVariants();

  return (
    <Ark.DecrementTrigger
      {...rest}
      data-slot="number-input-decrement-trigger"
      className={cn(numberInputDecrementTrigger(variants), className)}
    >
      {children ?? <Minus />}
    </Ark.DecrementTrigger>
  );
}
