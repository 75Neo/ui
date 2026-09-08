import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerViewTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ViewTrigger
> {}

export default function DatePickerViewTrigger({
  className,
  children,
  ...props
}: DatePickerViewTriggerProps) {
  return (
    <Ark.ViewTrigger className={cn(styles.viewTrigger(), className)} {...props}>
      {children}
    </Ark.ViewTrigger>
  );
}
