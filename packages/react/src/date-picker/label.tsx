import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "@75neo/themes";

export interface DatePickerLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function DatePickerLabel({ className, children, ...rest }: DatePickerLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="date-picker-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
