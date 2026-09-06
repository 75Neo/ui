import type React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cva } from "class-variance-authority";
import { Plus } from "lucide-react";
import {
  cn,
  numberInputDefaults,
  numberInputOrientationData,
  numberInputSizeData,
} from "@75neo/themes";
import { useNumberInputVariants } from "./variants";

const numberInputIncrementTrigger = cva(
  "inline-flex cursor-pointer items-center justify-center text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent",
  {
    variants: {
      size: numberInputSizeData.incrementTrigger,
      orientation: numberInputOrientationData.incrementTrigger,
    },
    defaultVariants: numberInputDefaults,
  },
);

export interface NumberInputIncrementTriggerProps extends React.ComponentProps<
  typeof Ark.IncrementTrigger
> {}

export function NumberInputIncrementTrigger({
  className,
  children,
  ...rest
}: NumberInputIncrementTriggerProps) {
  const variants = useNumberInputVariants();

  return (
    <Ark.IncrementTrigger
      {...rest}
      data-slot="number-input-increment-trigger"
      className={cn(numberInputIncrementTrigger(variants), className)}
    >
      {children ?? <Plus />}
    </Ark.IncrementTrigger>
  );
}
