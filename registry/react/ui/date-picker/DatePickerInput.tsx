import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerInputProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Input>,
  "children"
> {}

export default function DatePickerInput({ className, ...props }: DatePickerInputProps) {
  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
