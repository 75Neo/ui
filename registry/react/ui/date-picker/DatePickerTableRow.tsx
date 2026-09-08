import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerTableRowProps extends React.ComponentPropsWithRef<typeof Ark.TableRow> {}

export default function DatePickerTableRow({
  className,
  children,
  ...props
}: DatePickerTableRowProps) {
  const styles = datePicker();

  return (
    <Ark.TableRow className={cn(styles.tableRow(), className)} {...props}>
      {children}
    </Ark.TableRow>
  );
}
