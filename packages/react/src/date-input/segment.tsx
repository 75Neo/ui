import type React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cva } from "class-variance-authority";
import {
  cn,
  dateInputDefaults,
  dateInputSegmentCompoundData,
  dateInputSizeData,
} from "@75neo/themes";
import { useDateInputVariants } from "./variants";

const dateInputSegment = cva(
  "rounded-sm text-highlighted tabular-nums outline-none data-placeholder-shown:text-dimmed data-[type=literal]:px-0 data-[type=literal]:text-dimmed",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: dateInputSizeData.segment,
    },
    compoundVariants: dateInputSegmentCompoundData,
    defaultVariants: dateInputDefaults,
  },
);

export interface DateInputSegmentProps extends React.ComponentProps<typeof Ark.Segment> {}

export function DateInputSegment({ segment, className, children, ...rest }: DateInputSegmentProps) {
  const variants = useDateInputVariants();

  return (
    <Ark.Segment
      {...rest}
      segment={segment}
      data-slot="date-input-segment"
      className={cn(dateInputSegment(variants), className)}
    >
      {children}
    </Ark.Segment>
  );
}
