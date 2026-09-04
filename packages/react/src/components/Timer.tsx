import { Fragment } from "react";
import type React from "react";
import { Timer as Ark, type TimerRootProps } from "@ark-ui/react/timer";
import { type TimerProps as TimerContract, type TimerUnit, timer } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/** The buttons rendered under the digits, in order, with the text each one carries. */
const actions = [
  { action: "start", label: "Start" },
  { action: "pause", label: "Pause" },
  { action: "resume", label: "Resume" },
  { action: "reset", label: "Reset" },
] as const;

/**
 * Props for the Timer.
 *
 * @remarks
 * Which units render is data — the `units` array from the shared contract — so the
 * digits, their labels and the separators between them all come from one list, and a
 * caller reorders the clock by reordering it.
 */
export interface TimerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<
      TimerRootProps,
      | "autoStart"
      | "countdown"
      | "interval"
      | "startMs"
      | "targetMs"
      | "onComplete"
      | "onTick"
      | "ids"
    >,
    TimerContract {}

export function Timer({
  ui,
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
  ...rest
}: TimerProps) {
  const theme = useResolvedTheme(timer, "timer", { ui, size }, className);

  const shown: TimerUnit[] = units ?? ["minutes", "seconds"];

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      autoStart={autoStart}
      countdown={countdown}
      interval={interval}
      startMs={startMs}
      targetMs={targetMs}
      onComplete={onComplete}
      onTick={onTick}
      ids={ids}
    >
      <Ark.Area data-slot="area" className={theme.class.area}>
        {shown.map((unit, index) => (
          <Fragment key={unit}>
            {index > 0 && (
              <Ark.Separator data-slot="separator" className={theme.class.separator}>
                {separator}
              </Ark.Separator>
            )}
            <div data-slot="itemGroup" className={theme.class.itemGroup}>
              <Ark.Item type={unit} data-slot="item" className={theme.class.item} />
              {showLabels && (
                <span data-slot="label" className={theme.class.label}>
                  {labels?.[unit] ?? unit}
                </span>
              )}
            </div>
          </Fragment>
        ))}
      </Ark.Area>

      {controls && (
        <Ark.Control data-slot="control" className={theme.class.control}>
          {actions.map(({ action, label }) => (
            <Ark.ActionTrigger
              key={action}
              action={action}
              data-slot="actionTrigger"
              className={theme.class.actionTrigger}
            >
              {label}
            </Ark.ActionTrigger>
          ))}
        </Ark.Control>
      )}
    </Ark.Root>
  );
}
