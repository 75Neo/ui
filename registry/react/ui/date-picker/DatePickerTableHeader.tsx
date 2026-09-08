import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerTableHeaderProps extends React.ComponentPropsWithRef<
  typeof Ark.TableHeader
> {}

export default function DatePickerTableHeader({
  className,
  children,
  ...props
}: DatePickerTableHeaderProps) {
  const styles = datePicker();

  return (
    <Ark.TableHeader className={cn(styles.tableHeader(), className)} {...props}>
      {children}
    </Ark.TableHeader>
  );
}
