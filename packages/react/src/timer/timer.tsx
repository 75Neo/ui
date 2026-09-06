import { Fragment } from "react";
import type React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import {
  cn,
  timerActions,
  timerDefaults,
  timerDefaultUnits,
  type TimerRootProps as TimerContract,
  type TimerUnit,
} from "@75neo/themes";
import { TimerVariantsContext } from "./variants";
import { TimerActionTrigger } from "./action-trigger";
import { TimerArea } from "./area";
import { TimerControl } from "./control";
import { TimerItem } from "./item";
import { TimerSeparator } from "./separator";

export interface TimerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      | "autoStart"
      | "countdown"
      | "interval"
      | "startMs"
      | "targetMs"
      | "onComplete"
      | "onTick"
      | "ids"
    >,
    TimerContract {
  children?: React.ReactNode;
}

export function Timer({
  size,
  units,
  showLabels = true,
  labels,
  separator = ":",
  controls = true,
  autoStart,
  countdown,
  interval,
  startMs,
  targetMs,
  onComplete,
  onTick,
  ids,
  className,
  children,
  ...rest
}: TimerProps) {
  const resolved = { size: size ?? timerDefaults.size };
  const shown: TimerUnit[] = units ?? [...timerDefaultUnits];

  return (
    <TimerVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        autoStart={autoStart}
        countdown={countdown}
        interval={interval}
        startMs={startMs}
        targetMs={targetMs}
        onComplete={onComplete}
        onTick={onTick}
        ids={ids}
        data-slot="timer"
        data-size={resolved.size}
        className={cn("flex min-w-0 flex-col gap-3", className)}
      >
        {children ?? (
          <>
            <TimerArea>
              {shown.map((unit, index) => (
                <Fragment key={unit}>
                  {index > 0 && <TimerSeparator>{separator}</TimerSeparator>}
                  <TimerItem type={unit} label={labels?.[unit]} hideLabel={!showLabels} />
                </Fragment>
              ))}
            </TimerArea>
            {controls && (
              <TimerControl>
                {timerActions.map(({ action, label }) => (
                  <TimerActionTrigger key={action} action={action}>
                    {label}
                  </TimerActionTrigger>
                ))}
              </TimerControl>
            )}
          </>
        )}
      </Ark.Root>
    </TimerVariantsContext.Provider>
  );
}
