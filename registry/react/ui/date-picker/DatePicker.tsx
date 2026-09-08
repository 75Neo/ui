import React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

export interface DatePickerProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function DatePicker({ className, children, ...props }: DatePickerProps) {
  const styles = datePicker();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
