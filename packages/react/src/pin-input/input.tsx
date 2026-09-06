import type React from "react";
import { PinInput as Ark } from "@ark-ui/react/pin-input";
import { cva } from "class-variance-authority";
import { cn, pinInputDefaults, pinInputInputCompoundData, pinInputSizeData } from "@75neo/themes";
import { usePinInputVariants } from "./variants";

const pinInputInput = cva(
  "bg-default text-center font-medium text-highlighted tabular-nums ring ring-accented outline-none ring-inset placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75 data-invalid:ring-error",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: pinInputSizeData.input,
    },
    compoundVariants: pinInputInputCompoundData,
    defaultVariants: pinInputDefaults,
  },
);

export interface PinInputInputProps extends React.ComponentProps<typeof Ark.Input> {
  /** Which box this is, from zero. */
  index: number;
}

export function PinInputInput({ index, className, ...rest }: PinInputInputProps) {
  const variants = usePinInputVariants();

  return (
    <Ark.Input
      {...rest}
      index={index}
      data-slot="pin-input-input"
      className={cn(pinInputInput(variants), className)}
    />
  );
}
