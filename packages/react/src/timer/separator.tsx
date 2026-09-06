import type React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cva } from "class-variance-authority";
import { cn, timerDefaults, timerSizeData } from "@75neo/themes";
import { useTimerVariants } from "./variants";

const timerSeparator = cva("font-semibold text-muted tabular-nums", {
  variants: { size: timerSizeData.separator },
  defaultVariants: timerDefaults,
});

export interface TimerSeparatorProps extends React.ComponentProps<typeof Ark.Separator> {}

export function TimerSeparator({ className, children, ...rest }: TimerSeparatorProps) {
  const variants = useTimerVariants();

  return (
    <Ark.Separator
      {...rest}
      data-slot="timer-separator"
      className={cn(timerSeparator(variants), className)}
    >
      {children ?? ":"}
    </Ark.Separator>
  );
}
