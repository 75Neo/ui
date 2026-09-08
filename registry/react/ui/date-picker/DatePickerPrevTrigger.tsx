import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerPrevTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.PrevTrigger
> {}

export default function DatePickerPrevTrigger({
  className,
  children,
  ...props
}: DatePickerPrevTriggerProps) {
  const styles = datePicker();

  return (
    <Ark.PrevTrigger className={cn(styles.prevTrigger(), className)} {...props}>
      {children}
    </Ark.PrevTrigger>
  );
}
