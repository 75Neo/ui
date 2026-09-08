import React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "cn";
import { segmentGroupStyles as styles } from "@/registry/shared/lib/segment-group.styles";

export interface SegmentGroupLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function SegmentGroupLabel({
  className,
  children,
  ...props
}: SegmentGroupLabelProps) {
  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
