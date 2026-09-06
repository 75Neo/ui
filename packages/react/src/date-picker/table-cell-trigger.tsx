import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import {
  cn,
  datePickerDefaults,
  datePickerSizeData,
  datePickerTableCellTriggerCompoundData,
} from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerTableCellTrigger = cva(
  "flex w-full cursor-pointer items-center justify-center rounded-md text-toned tabular-nums transition-colors outline-none select-none focus-visible:outline-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-outside-range:text-dimmed data-unavailable:cursor-not-allowed data-unavailable:line-through data-unavailable:opacity-50",
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
      size: datePickerSizeData.tableCellTrigger,
    },
    compoundVariants: datePickerTableCellTriggerCompoundData,
    defaultVariants: datePickerDefaults,
  },
);

export interface DatePickerTableCellTriggerProps extends React.ComponentProps<
  typeof Ark.TableCellTrigger
> {}

export function DatePickerTableCellTrigger({
  className,
  children,
  ...rest
}: DatePickerTableCellTriggerProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.TableCellTrigger
      {...rest}
      data-slot="date-picker-table-cell-trigger"
      className={cn(datePickerTableCellTrigger(variants), className)}
    >
      {children}
    </Ark.TableCellTrigger>
  );
}
