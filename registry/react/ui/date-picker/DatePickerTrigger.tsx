import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function DatePickerTrigger({
  className,
  children,
  ...props
}: DatePickerTriggerProps) {
  const styles = datePicker();

  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {children}
    </Ark.Trigger>
  );
}
