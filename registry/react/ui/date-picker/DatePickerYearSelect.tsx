import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerYearSelectProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.YearSelect>,
  "children"
> {}

export default function DatePickerYearSelect({ className, ...props }: DatePickerYearSelectProps) {
  return <Ark.YearSelect className={cn(styles.yearSelect(), className)} {...props} />;
}
