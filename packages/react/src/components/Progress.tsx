import type React from "react";
import { Progress as Ark, type ProgressRootProps } from "@ark-ui/react/progress";
import { type ProgressProps as ProgressContract, progress } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Progress.
 *
 * @remarks
 * Two HTML attributes are dropped: `color`, where the legacy presentational attribute
 * would collide with the variant, and `defaultValue`, so Ark's own can take the name.
 */
export interface ProgressProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<ProgressRootProps, "value" | "defaultValue" | "onValueChange" | "ids">,
    ProgressContract {}

export function Progress({
  ui,
  color,
  size,
  label,
  showValue = false,
  min,
  max,
  orientation,
  formatOptions,
  locale,
  value,
  defaultValue,
  onValueChange,
  ids,
  className,
  ...rest
}: ProgressProps) {
  const theme = useResolvedTheme(progress, "progress", { ui, color, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      min={min}
      max={max}
      orientation={orientation}
      formatOptions={formatOptions}
      locale={locale}
      ids={ids}
    >
      {(label != null || showValue) && (
        <div data-slot="header" className={theme.class.header}>
          {label != null && (
            <Ark.Label data-slot="label" className={theme.class.label}>
              {label}
            </Ark.Label>
          )}
          {showValue && <Ark.ValueText data-slot="valueText" className={theme.class.valueText} />}
        </div>
      )}

      <Ark.Track data-slot="track" className={theme.class.track}>
        <Ark.Range data-slot="range" className={theme.class.range} />
      </Ark.Track>
    </Ark.Root>
  );
}
