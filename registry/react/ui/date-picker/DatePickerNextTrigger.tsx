import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerNextTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.NextTrigger
> {}

export default function DatePickerNextTrigger({
  className,
  children,
  ...props
}: DatePickerNextTriggerProps) {
  return (
    <Ark.NextTrigger className={cn(styles.nextTrigger(), className)} {...props}>
      {children}
    </Ark.NextTrigger>
  );
}
