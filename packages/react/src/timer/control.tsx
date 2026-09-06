import type React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "@75neo/themes";

export interface TimerControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function TimerControl({ className, children, ...rest }: TimerControlProps) {
  return (
    <Ark.Control
      {...rest}
      data-slot="timer-control"
      className={cn("flex min-w-0 flex-wrap items-center gap-2", className)}
    >
      {children}
    </Ark.Control>
  );
}
