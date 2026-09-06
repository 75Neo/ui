import type React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cva } from "class-variance-authority";
import {
  cn,
  dateInputControlCompoundData,
  dateInputDefaults,
  dateInputSizeData,
} from "@75neo/themes";
import { useDateInputVariants } from "./variants";

const dateInputControl = cva(
  "flex min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
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
      size: dateInputSizeData.control,
    },
    compoundVariants: dateInputControlCompoundData,
    defaultVariants: dateInputDefaults,
  },
);

export interface DateInputControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function DateInputControl({ className, children, ...rest }: DateInputControlProps) {
  const variants = useDateInputVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="date-input-control"
      className={cn(dateInputControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
