import type React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn, progressDefaults, type ProgressRootProps as ProgressContract } from "@75neo/themes";
import { ProgressVariantsContext } from "./variants";
import { ProgressCircle } from "./circle";
import { ProgressCircleRange } from "./circle-range";
import { ProgressCircleTrack } from "./circle-track";
import { ProgressLabel } from "./label";
import { ProgressRange } from "./range";
import { ProgressTrack } from "./track";
import { ProgressValueText } from "./value-text";

/**
 * Props for the Progress.
 *
 * @remarks
 * `dir` belongs to the locale provider.
 *
 * The value state comes from Ark, because React and Vue spell a controlled value
 * too differently to share one type. A `null` value is the indeterminate bar,
 * which sweeps rather than fills.
 */
export interface ProgressProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<React.ComponentProps<typeof Ark.Root>, "value" | "defaultValue" | "onValueChange" | "ids">,
    ProgressContract {
  children?: React.ReactNode;
}

export function Progress({
  size,
  color,
  circle = false,
  label,
  showValue,
  min,
  max,
  orientation,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  children,
  ...rest
}: ProgressProps) {
  const resolved = {
    size: size ?? progressDefaults.size,
    color: color ?? progressDefaults.color,
  };

  return (
    <ProgressVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        orientation={orientation}
        ids={ids}
        data-slot="progress"
        data-size={resolved.size}
        data-color={resolved.color}
        data-circle={circle}
        className={cn("flex w-full flex-col gap-2 data-[circle=true]:items-center", className)}
      >
        {(label != null || (showValue ?? true)) && (
          <span
            data-slot="progress-header"
            className="flex w-full items-center justify-between gap-2"
          >
            {label != null ? <ProgressLabel>{label}</ProgressLabel> : <span />}
            {(showValue ?? true) && <ProgressValueText />}
          </span>
        )}
        {circle ? (
          <ProgressCircle>
            <ProgressCircleTrack />
            <ProgressCircleRange />
          </ProgressCircle>
        ) : (
          <ProgressTrack>
            <ProgressRange />
          </ProgressTrack>
        )}
        {children}
      </Ark.Root>
    </ProgressVariantsContext.Provider>
  );
}
