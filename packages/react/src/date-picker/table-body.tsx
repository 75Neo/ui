import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "@75neo/themes";

export interface DatePickerTableBodyProps extends React.ComponentProps<typeof Ark.TableBody> {}

export function DatePickerTableBody({ className, children, ...rest }: DatePickerTableBodyProps) {
  return (
    <Ark.TableBody {...rest} data-slot="date-picker-table-body" className={cn(className)}>
      {children}
    </Ark.TableBody>
  );
}
