import type React from "react";
import { SegmentGroup as Ark } from "@ark-ui/react/segment-group";
import { cn } from "@75neo/themes";

export interface SegmentGroupIndicatorProps extends React.ComponentProps<typeof Ark.Indicator> {}

export function SegmentGroupIndicator({ className, ...rest }: SegmentGroupIndicatorProps) {
  return (
    <Ark.Indicator
      {...rest}
      data-slot="segment-group-indicator"
      className={cn(
        "absolute top-(--top) left-(--left) -z-10 h-(--height) w-(--width) rounded-sm bg-default shadow-sm",
        className,
      )}
    />
  );
}
