import type React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cva } from "class-variance-authority";
import {
  cn,
  timerDefaults,
  timerSizeData,
  type TimerItemProps as TimerItemContract,
} from "@75neo/themes";
import { useTimerVariants } from "./variants";

const timerItem = cva("min-w-[2ch] text-center font-semibold text-highlighted tabular-nums", {
  variants: { size: timerSizeData.item },
  defaultVariants: timerDefaults,
});

export interface TimerItemProps
  extends Omit<React.ComponentProps<typeof Ark.Item>, "type">, TimerItemContract {}

export function TimerItem({ type, label, hideLabel, className, ...rest }: TimerItemProps) {
  const variants = useTimerVariants();

  return (
    // The column, not the digits: Ark's Item is the digits and the name sits under it.
    <span data-slot="timer-item-group" className="flex min-w-0 flex-col items-center">
      <Ark.Item
        {...rest}
        type={type}
        data-slot="timer-item"
        className={cn(timerItem(variants), className)}
      />
      {!hideLabel && (
        <span
          data-slot="timer-label"
          className={cn("text-muted", timerSizeData.label[variants.size])}
        >
          {label ?? type}
        </span>
      )}
    </span>
  );
}
