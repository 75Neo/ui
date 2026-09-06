import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "@75neo/themes";

export interface DatePickerTableCellProps extends React.ComponentProps<typeof Ark.TableCell> {}

export function DatePickerTableCell({ className, children, ...rest }: DatePickerTableCellProps) {
  return (
    <Ark.TableCell {...rest} data-slot="date-picker-table-cell" className={cn("p-0", className)}>
      {children}
    </Ark.TableCell>
  );
}
