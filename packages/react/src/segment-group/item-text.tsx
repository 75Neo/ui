import type React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "@75neo/themes";

export interface SegmentGroupItemTextProps extends React.ComponentProps<typeof Ark.ItemText> {}

export function SegmentGroupItemText({ className, children, ...rest }: SegmentGroupItemTextProps) {
  return (
    <Ark.ItemText
      {...rest}
      data-slot="segment-group-item-text"
      className={cn("truncate", className)}
    >
      {children}
    </Ark.ItemText>
  );
}
