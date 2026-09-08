import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerTableBodyProps extends React.ComponentPropsWithRef<
  typeof Ark.TableBody
> {}

export default function DatePickerTableBody({
  className,
  children,
  ...props
}: DatePickerTableBodyProps) {
  const styles = datePicker();

  return (
    <Ark.TableBody className={cn(styles.tableBody(), className)} {...props}>
      {children}
    </Ark.TableBody>
  );
}
