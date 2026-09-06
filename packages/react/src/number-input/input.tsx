import type React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cva } from "class-variance-authority";
import {
  cn,
  numberInputDefaults,
  numberInputOrientationData,
  numberInputSizeData,
} from "@75neo/themes";
import { useNumberInputVariants } from "./variants";

const numberInputInput = cva(
  "min-w-0 bg-transparent text-highlighted tabular-nums outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: {
      size: numberInputSizeData.input,
      orientation: numberInputOrientationData.input,
    },
    defaultVariants: numberInputDefaults,
  },
);

export interface NumberInputInputProps extends React.ComponentProps<typeof Ark.Input> {}

export function NumberInputInput({ className, ...rest }: NumberInputInputProps) {
  const variants = useNumberInputVariants();

  return (
    <Ark.Input
      {...rest}
      data-slot="number-input-input"
      className={cn(numberInputInput(variants), className)}
    />
  );
}
