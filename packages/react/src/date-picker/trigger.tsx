import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { Calendar } from "lucide-react";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: datePickerSizeData.trigger },
    defaultVariants: datePickerDefaults,
  },
);

export interface DatePickerTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {}

export function DatePickerTrigger({ className, children, ...rest }: DatePickerTriggerProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.Trigger
      {...rest}
      data-slot="date-picker-trigger"
      className={cn(datePickerTrigger(variants), className)}
    >
      {children ?? <Calendar />}
    </Ark.Trigger>
  );
}
