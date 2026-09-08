import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function DatePickerLabel({ className, children, ...props }: DatePickerLabelProps) {
  const styles = datePicker();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
