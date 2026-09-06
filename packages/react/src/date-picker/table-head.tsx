import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "@75neo/themes";

export interface DatePickerTableHeadProps extends React.ComponentProps<typeof Ark.TableHead> {}

export function DatePickerTableHead({ className, children, ...rest }: DatePickerTableHeadProps) {
  return (
    <Ark.TableHead {...rest} data-slot="date-picker-table-head" className={cn(className)}>
      {children}
    </Ark.TableHead>
  );
}
