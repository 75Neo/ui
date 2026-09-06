import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerViewControl = cva("flex items-center justify-between", {
  variants: { size: datePickerSizeData.viewControl },
  defaultVariants: datePickerDefaults,
});

export interface DatePickerViewControlProps extends React.ComponentProps<typeof Ark.ViewControl> {}

export function DatePickerViewControl({
  className,
  children,
  ...rest
}: DatePickerViewControlProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.ViewControl
      {...rest}
      data-slot="date-picker-view-control"
      className={cn(datePickerViewControl(variants), className)}
    >
      {children}
    </Ark.ViewControl>
  );
}
