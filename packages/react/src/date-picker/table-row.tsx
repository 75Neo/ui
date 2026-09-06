import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "@75neo/themes";

export interface DatePickerTableRowProps extends React.ComponentProps<typeof Ark.TableRow> {}

export function DatePickerTableRow({ className, children, ...rest }: DatePickerTableRowProps) {
  return (
    <Ark.TableRow {...rest} data-slot="date-picker-table-row" className={cn(className)}>
      {children}
    </Ark.TableRow>
  );
}
