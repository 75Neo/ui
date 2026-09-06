import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerClearTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: datePickerSizeData.clearTrigger },
    defaultVariants: datePickerDefaults,
  },
);

export interface DatePickerClearTriggerProps extends React.ComponentProps<
  typeof Ark.ClearTrigger
> {}

export function DatePickerClearTrigger({
  className,
  children,
  ...rest
}: DatePickerClearTriggerProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.ClearTrigger
      {...rest}
      data-slot="date-picker-clear-trigger"
      className={cn(datePickerClearTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.ClearTrigger>
  );
}
