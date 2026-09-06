import type React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cva } from "class-variance-authority";
import { cn, progressDefaults, progressSizeData } from "@75neo/themes";
import { useProgressVariants } from "./variants";

const progressTrack = cva("w-full overflow-hidden rounded-full bg-elevated", {
  variants: { size: progressSizeData.track },
  defaultVariants: progressDefaults,
});

export interface ProgressTrackProps extends React.ComponentProps<typeof Ark.Track> {
  children?: React.ReactNode;
}

export function ProgressTrack({ className, children, ...rest }: ProgressTrackProps) {
  const variants = useProgressVariants();

  return (
    <Ark.Track
      {...rest}
      data-slot="progress-track"
      className={cn(progressTrack({ size: variants.size }), className)}
    >
      {children}
    </Ark.Track>
  );
}
