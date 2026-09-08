import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function DatePickerContent({
  className,
  children,
  ...props
}: DatePickerContentProps) {
  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
