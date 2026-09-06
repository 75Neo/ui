import type React from "react";
import { NumberInput as Ark } from "@ark-ui/react/number-input";
import { cva } from "class-variance-authority";
import {
  cn,
  numberInputControlCompoundData,
  numberInputDefaults,
  numberInputOrientationData,
  numberInputSizeData,
} from "@75neo/themes";
import { useNumberInputVariants } from "./variants";

const numberInputControl = cva(
  "w-full min-w-0 overflow-hidden bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
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
      size: numberInputSizeData.control,
      orientation: numberInputOrientationData.control,
    },
    compoundVariants: numberInputControlCompoundData,
    defaultVariants: numberInputDefaults,
  },
);

export interface NumberInputControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function NumberInputControl({ className, children, ...rest }: NumberInputControlProps) {
  const variants = useNumberInputVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="number-input-control"
      className={cn(numberInputControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
