import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function DatePickerControl({
  className,
  children,
  ...props
}: DatePickerControlProps) {
  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
