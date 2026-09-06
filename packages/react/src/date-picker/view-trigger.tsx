import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerViewTrigger = cva(
  "inline-flex flex-1 cursor-pointer items-center justify-center rounded-md font-medium text-highlighted transition-colors outline-none hover:bg-elevated",
  {
    variants: { size: datePickerSizeData.viewTrigger },
    defaultVariants: datePickerDefaults,
  },
);

export interface DatePickerViewTriggerProps extends React.ComponentProps<typeof Ark.ViewTrigger> {}

export function DatePickerViewTrigger({
  className,
  children,
  ...rest
}: DatePickerViewTriggerProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.ViewTrigger
      {...rest}
      data-slot="date-picker-view-trigger"
      className={cn(datePickerViewTrigger(variants), className)}
    >
      {children ?? <Ark.RangeText />}
    </Ark.ViewTrigger>
  );
}
