import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerValueTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ValueText>,
  "children"
> {}

export default function DatePickerValueText({ className, ...props }: DatePickerValueTextProps) {
  const styles = datePicker();

  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
