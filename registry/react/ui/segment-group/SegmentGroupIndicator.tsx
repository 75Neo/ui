import React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "cn";
import { segmentGroupStyles as styles } from "@/registry/shared/lib/segment-group.styles";

export interface SegmentGroupIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.Indicator
> {}

export default function SegmentGroupIndicator({ className, ...props }: SegmentGroupIndicatorProps) {
  return <Ark.Indicator className={cn(styles.indicator(), className)} {...props} />;
}
