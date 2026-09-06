import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cn } from "@75neo/themes";

export interface DatePickerControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function DatePickerControl({ className, children, ...rest }: DatePickerControlProps) {
  return (
    <Ark.Control
      {...rest}
      data-slot="date-picker-control"
      className={cn(
        "flex w-full min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
        className,
      )}
    >
      {children}
    </Ark.Control>
  );
}
