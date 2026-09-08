import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerPositionerProps extends React.ComponentPropsWithRef<
  typeof Ark.Positioner
> {}

export default function DatePickerPositioner({
  className,
  children,
  ...props
}: DatePickerPositionerProps) {
  const styles = datePicker();

  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
