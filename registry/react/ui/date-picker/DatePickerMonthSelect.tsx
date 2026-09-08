import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerMonthSelectProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.MonthSelect>,
  "children"
> {}

export default function DatePickerMonthSelect({ className, ...props }: DatePickerMonthSelectProps) {
  return <Ark.MonthSelect className={cn(styles.monthSelect(), className)} {...props} />;
}
