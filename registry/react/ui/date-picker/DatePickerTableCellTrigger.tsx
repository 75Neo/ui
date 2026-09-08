import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerTableCellTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.TableCellTrigger
> {}

export default function DatePickerTableCellTrigger({
  className,
  children,
  ...props
}: DatePickerTableCellTriggerProps) {
  const styles = datePicker();

  return (
    <Ark.TableCellTrigger className={cn(styles.tableCellTrigger(), className)} {...props}>
      {children}
    </Ark.TableCellTrigger>
  );
}
