import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "@75neo/themes";

export interface DatePickerTableProps extends React.ComponentProps<typeof Ark.Table> {}

export function DatePickerTable({ className, children, ...rest }: DatePickerTableProps) {
  return (
    <Ark.Table
      {...rest}
      data-slot="date-picker-table"
      className={cn("w-full border-separate border-spacing-0.5", className)}
    >
      {children}
    </Ark.Table>
  );
}
