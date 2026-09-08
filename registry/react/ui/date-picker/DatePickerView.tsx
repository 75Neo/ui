import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerViewProps extends React.ComponentPropsWithRef<typeof Ark.View> {}

export default function DatePickerView({ className, children, ...props }: DatePickerViewProps) {
  return (
    <Ark.View className={cn(styles.view(), className)} {...props}>
      {children}
    </Ark.View>
  );
}
