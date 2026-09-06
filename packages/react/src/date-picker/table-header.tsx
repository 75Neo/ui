import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerTableHeader = cva("font-medium text-dimmed", {
  variants: { size: datePickerSizeData.tableHeader },
  defaultVariants: datePickerDefaults,
});

export interface DatePickerTableHeaderProps extends React.ComponentProps<typeof Ark.TableHeader> {}

export function DatePickerTableHeader({
  className,
  children,
  ...rest
}: DatePickerTableHeaderProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.TableHeader
      {...rest}
      data-slot="date-picker-table-header"
      className={cn(datePickerTableHeader(variants), className)}
    >
      {children}
    </Ark.TableHeader>
  );
}
