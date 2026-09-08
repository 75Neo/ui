import React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "cn";
import { segmentGroup, type SegmentGroupSize } from "@/registry/shared/lib/segment-group.styles";

export interface SegmentGroupProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: SegmentGroupSize;
}

export default function SegmentGroup({
  size = "md",
  className,
  children,
  ...props
}: SegmentGroupProps) {
  const styles = segmentGroup();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
