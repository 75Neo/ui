import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerClearTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ClearTrigger
> {}

export default function DatePickerClearTrigger({
  className,
  children,
  ...props
}: DatePickerClearTriggerProps) {
  const styles = datePicker();

  return (
    <Ark.ClearTrigger className={cn(styles.clearTrigger(), className)} {...props}>
      {children}
    </Ark.ClearTrigger>
  );
}
