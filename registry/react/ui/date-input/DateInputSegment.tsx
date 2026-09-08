import React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cn } from "cn";
import { dateInput } from "@/registry/shared/lib/date-input.styles";

export interface DateInputSegmentProps extends React.ComponentPropsWithRef<typeof Ark.Segment> {}

export default function DateInputSegment({ className, children, ...props }: DateInputSegmentProps) {
  const styles = dateInput();

  return (
    <Ark.Segment className={cn(styles.segment(), className)} {...props}>
      {children}
    </Ark.Segment>
  );
}
