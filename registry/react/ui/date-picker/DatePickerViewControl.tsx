import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerViewControlProps extends React.ComponentPropsWithRef<
  typeof Ark.ViewControl
> {}

export default function DatePickerViewControl({
  className,
  children,
  ...props
}: DatePickerViewControlProps) {
  return (
    <Ark.ViewControl className={cn(styles.viewControl(), className)} {...props}>
      {children}
    </Ark.ViewControl>
  );
}
