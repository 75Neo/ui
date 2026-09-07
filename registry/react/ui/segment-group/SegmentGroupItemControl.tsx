import React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "cn";
import { segmentGroup } from "@/registry/shared/lib/segment-group.styles";

export interface SegmentGroupItemControlProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemControl
> {}

export default function SegmentGroupItemControl({
  className,
  ...props
}: SegmentGroupItemControlProps) {
  const styles = segmentGroup();

  return <Ark.ItemControl className={cn(styles.itemControl(), className)} {...props} />;
}
