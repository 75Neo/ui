import type React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "@75neo/themes";

export interface TimerAreaProps extends React.ComponentProps<typeof Ark.Area> {}

export function TimerArea({ className, children, ...rest }: TimerAreaProps) {
  return (
    <Ark.Area
      {...rest}
      data-slot="timer-area"
      className={cn("flex min-w-0 items-center gap-2", className)}
    >
      {children}
    </Ark.Area>
  );
}
