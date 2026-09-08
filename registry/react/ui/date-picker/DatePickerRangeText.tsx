import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerRangeTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.RangeText>,
  "children"
> {}

export default function DatePickerRangeText({ className, ...props }: DatePickerRangeTextProps) {
  const styles = datePicker();

  return <Ark.RangeText className={cn(styles.rangeText(), className)} {...props} />;
}
