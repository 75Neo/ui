import React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cn } from "cn";
import { dateInputStyles as styles } from "@/registry/shared/lib/date-input.styles";

export interface DateInputSegmentProps extends React.ComponentPropsWithRef<typeof Ark.Segment> {}

export default function DateInputSegment({ className, children, ...props }: DateInputSegmentProps) {
  return (
    <Ark.Segment className={cn(styles.segment(), className)} {...props}>
      {children}
    </Ark.Segment>
  );
}
