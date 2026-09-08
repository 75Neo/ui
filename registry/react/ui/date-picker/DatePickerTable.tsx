import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerTableProps extends React.ComponentPropsWithRef<typeof Ark.Table> {}

export default function DatePickerTable({ className, children, ...props }: DatePickerTableProps) {
  const styles = datePicker();

  return (
    <Ark.Table className={cn(styles.table(), className)} {...props}>
      {children}
    </Ark.Table>
  );
}
