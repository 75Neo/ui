import type React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn } from "@75neo/themes";

export interface ProgressCircleTrackProps extends React.ComponentProps<typeof Ark.CircleTrack> {}

export function ProgressCircleTrack({ className, ...rest }: ProgressCircleTrackProps) {
  return (
    <Ark.CircleTrack
      {...rest}
      data-slot="progress-circle-track"
      className={cn("stroke-default", className)}
    />
  );
}
