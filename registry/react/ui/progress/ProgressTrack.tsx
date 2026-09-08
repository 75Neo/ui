import React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn } from "cn";
import { progressStyles as styles } from "@/registry/shared/lib/progress.styles";

export interface ProgressTrackProps extends React.ComponentPropsWithRef<typeof Ark.Track> {}

export default function ProgressTrack({ className, children, ...props }: ProgressTrackProps) {
  return (
    <Ark.Track className={cn(styles.track(), className)} {...props}>
      {children}
    </Ark.Track>
  );
}
