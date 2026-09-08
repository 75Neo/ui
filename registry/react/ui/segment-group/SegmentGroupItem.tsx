import React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "cn";
import { segmentGroupStyles as styles } from "@/registry/shared/lib/segment-group.styles";

export interface SegmentGroupItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function SegmentGroupItem({ className, children, ...props }: SegmentGroupItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
