import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerView = cva("flex flex-col [&[hidden]]:hidden", {
  variants: { size: datePickerSizeData.view },
  defaultVariants: datePickerDefaults,
});

export interface DatePickerViewProps extends React.ComponentProps<typeof Ark.View> {
  /** Which grid this view draws: days, months or years. */
  view: "day" | "month" | "year";
}

export function DatePickerView({ view, className, children, ...rest }: DatePickerViewProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.View
      {...rest}
      view={view}
      data-slot="date-picker-view"
      className={cn(datePickerView(variants), className)}
    >
      {children}
    </Ark.View>
  );
}
