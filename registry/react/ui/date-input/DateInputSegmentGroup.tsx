import React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cn } from "cn";
import { dateInputStyles as styles } from "@/registry/shared/lib/date-input.styles";

export interface DateInputSegmentGroupProps extends React.ComponentPropsWithRef<
  typeof Ark.SegmentGroup
> {}

export default function DateInputSegmentGroup({
  className,
  children,
  ...props
}: DateInputSegmentGroupProps) {
  return (
    <Ark.SegmentGroup className={cn(styles.segmentGroup(), className)} {...props}>
      {children}
    </Ark.SegmentGroup>
  );
}
