import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerInput = cva(
  "min-w-0 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: { size: datePickerSizeData.input },
    defaultVariants: datePickerDefaults,
  },
);

export interface DatePickerInputProps extends React.ComponentProps<typeof Ark.Input> {
  /** Which field this is: the date, or the end of a range. */
  index?: number;
}

export function DatePickerInput({ index, className, ...rest }: DatePickerInputProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.Input
      {...rest}
      index={index ?? 0}
      data-slot="date-picker-input"
      className={cn(datePickerInput(variants), className)}
    />
  );
}
