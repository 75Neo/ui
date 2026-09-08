import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerTableCellProps extends React.ComponentPropsWithRef<
  typeof Ark.TableCell
> {}

export default function DatePickerTableCell({
  className,
  children,
  ...props
}: DatePickerTableCellProps) {
  const styles = datePicker();

  return (
    <Ark.TableCell className={cn(styles.tableCell(), className)} {...props}>
      {children}
    </Ark.TableCell>
  );
}
