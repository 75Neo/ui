import React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "cn";
import { segmentGroup } from "@/registry/shared/lib/segment-group.styles";

export interface SegmentGroupIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.Indicator
> {}

export default function SegmentGroupIndicator({ className, ...props }: SegmentGroupIndicatorProps) {
  const styles = segmentGroup();

  return <Ark.Indicator className={cn(styles.indicator(), className)} {...props} />;
}
