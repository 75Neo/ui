import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerInputProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Input>,
  "children"
> {}

export default function DatePickerInput({ className, ...props }: DatePickerInputProps) {
  const styles = datePicker();

  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
