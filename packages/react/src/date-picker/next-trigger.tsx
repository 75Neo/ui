import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { ChevronRight } from "lucide-react";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerNextTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: datePickerSizeData.nextTrigger },
    defaultVariants: datePickerDefaults,
  },
);

export interface DatePickerNextTriggerProps extends React.ComponentProps<typeof Ark.NextTrigger> {}

export function DatePickerNextTrigger({
  className,
  children,
  ...rest
}: DatePickerNextTriggerProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.NextTrigger
      {...rest}
      data-slot="date-picker-next-trigger"
      className={cn(datePickerNextTrigger(variants), className)}
    >
      {children ?? <ChevronRight />}
    </Ark.NextTrigger>
  );
}
