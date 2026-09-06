import type React from "react";
import { DatePicker as Ark } from "@ark-ui/react/date-picker";
import { cva } from "class-variance-authority";
import { ChevronLeft } from "lucide-react";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerPrevTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: datePickerSizeData.prevTrigger },
    defaultVariants: datePickerDefaults,
  },
);

export interface DatePickerPrevTriggerProps extends React.ComponentProps<typeof Ark.PrevTrigger> {}

export function DatePickerPrevTrigger({
  className,
  children,
  ...rest
}: DatePickerPrevTriggerProps) {
  const variants = useDatePickerVariants();

  return (
    <Ark.PrevTrigger
      {...rest}
      data-slot="date-picker-prev-trigger"
      className={cn(datePickerPrevTrigger(variants), className)}
    >
      {children ?? <ChevronLeft />}
    </Ark.PrevTrigger>
  );
}
