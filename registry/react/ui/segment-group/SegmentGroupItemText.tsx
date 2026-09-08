import React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "cn";
import { segmentGroupStyles as styles } from "@/registry/shared/lib/segment-group.styles";

export interface SegmentGroupItemTextProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemText
> {}

export default function SegmentGroupItemText({
  className,
  children,
  ...props
}: SegmentGroupItemTextProps) {
  return (
    <Ark.ItemText className={cn(styles.itemText(), className)} {...props}>
      {children}
    </Ark.ItemText>
  );
}
