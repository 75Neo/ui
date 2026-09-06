import type React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cn } from "@75neo/themes";

export interface DateInputSegmentGroupProps extends React.ComponentProps<typeof Ark.SegmentGroup> {
  /** Which date this group edits: the date, or the end of a range. */
  index?: number;
}

export function DateInputSegmentGroup({
  index,
  className,
  children,
  ...rest
}: DateInputSegmentGroupProps) {
  return (
    <Ark.SegmentGroup
      {...rest}
      index={index ?? 0}
      data-slot="date-input-segment-group"
      className={cn("flex items-center", className)}
    >
      {children}
    </Ark.SegmentGroup>
  );
}
