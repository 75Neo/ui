import React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "cn";
import { segmentGroup } from "@/registry/shared/lib/segment-group.styles";

export interface SegmentGroupProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function SegmentGroup({ className, children, ...props }: SegmentGroupProps) {
  const styles = segmentGroup();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
