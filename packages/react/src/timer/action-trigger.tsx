import type React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cva } from "class-variance-authority";
import {
  cn,
  timerDefaults,
  timerSizeData,
  type TimerActionTriggerProps as TimerActionTriggerContract,
} from "@75neo/themes";
import { useTimerVariants } from "./variants";

const timerActionTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md bg-default font-medium text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:ring-inverted focus-visible:outline-3 active:bg-elevated disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: { size: timerSizeData.actionTrigger },
    defaultVariants: timerDefaults,
  },
);

export interface TimerActionTriggerProps
  extends
    Omit<React.ComponentProps<typeof Ark.ActionTrigger>, "action">,
    TimerActionTriggerContract {}

export function TimerActionTrigger({
  action,
  className,
  children,
  ...rest
}: TimerActionTriggerProps) {
  const variants = useTimerVariants();

  return (
    <Ark.ActionTrigger
      {...rest}
      action={action}
      data-slot="timer-action-trigger"
      className={cn(timerActionTrigger(variants), className)}
    >
      {children}
    </Ark.ActionTrigger>
  );
}
