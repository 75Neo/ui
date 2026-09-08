import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerTableHeadProps extends React.ComponentPropsWithRef<
  typeof Ark.TableHead
> {}

export default function DatePickerTableHead({
  className,
  children,
  ...props
}: DatePickerTableHeadProps) {
  return (
    <Ark.TableHead className={cn(styles.tableHead(), className)} {...props}>
      {children}
    </Ark.TableHead>
  );
}
