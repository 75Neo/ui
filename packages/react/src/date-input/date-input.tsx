import type React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import {
  cn,
  dateInputDefaults,
  dateInputLiteralText,
  dateInputSizeData,
  type DateInputRootProps as DateInputContract,
} from "@75neo/themes";
import { DateInputVariantsContext } from "./variants";
import { DateInputControl } from "./control";
import { DateInputLabel } from "./label";
import { DateInputSegment } from "./segment";
import { DateInputSegmentGroup } from "./segment-group";

/**
 * Props for the DateInput.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, since
 * the attribute admits a string where Ark's root takes dates, and `dir` because
 * direction belongs to the locale provider.
 *
 * Date values are Ark's `DateValue`, re-exported above so callers add no new
 * dependency for them.
 */
export interface DateInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      | "value"
      | "defaultValue"
      | "onValueChange"
      | "min"
      | "max"
      | "isDateUnavailable"
      | "placeholderValue"
      | "ids"
    >,
    DateInputContract<React.ReactNode> {}

export function DateInput({
  color,
  size,
  label,
  selectionMode,
  granularity,
  locale,
  timeZone,
  shouldForceLeadingZeros,
  hideTimeZone,
  rangeSeparator,
  leadingIcon,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  isDateUnavailable,
  placeholderValue,
  ids,
  className,
  ...rest
}: DateInputProps) {
  const resolved = {
    color: color ?? dateInputDefaults.color,
    size: size ?? dateInputDefaults.size,
  };
  const range = selectionMode === "range";

  /*
   * One group per date, so a range is two of them. The segments cannot be hoisted
   * out of their group, and a literal segment's text is rewritten on the way in,
   * because ICU's idea of the space before AM and PM differs between the runtime
   * that renders the page and the one that hydrates it.
   */
  const segments = (index: number) => (
    <DateInputSegmentGroup index={index}>
      <Ark.SegmentContext>
        {(segment) => (
          <DateInputSegment
            segment={
              segment.type === "literal"
                ? { ...segment, text: dateInputLiteralText(segment.text) }
                : segment
            }
          />
        )}
      </Ark.SegmentContext>
    </DateInputSegmentGroup>
  );

  return (
    <DateInputVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="date-input"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex min-w-0 flex-col gap-1.5", className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        isDateUnavailable={isDateUnavailable}
        placeholderValue={placeholderValue}
        granularity={granularity}
        locale={locale}
        timeZone={timeZone}
        shouldForceLeadingZeros={shouldForceLeadingZeros}
        hideTimeZone={hideTimeZone}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        name={name}
        ids={ids}
      >
        {label != null && <DateInputLabel>{label}</DateInputLabel>}
        <DateInputControl>
          {leadingIcon != null && (
            <span
              data-slot="date-input-leading-icon"
              className={cn(
                "shrink-0 text-dimmed [&>svg]:size-full",
                dateInputSizeData.leadingIcon[resolved.size],
              )}
            >
              {leadingIcon}
            </span>
          )}
          {segments(0)}
          {range && (
            <>
              <span
                data-slot="date-input-separator"
                className={cn("shrink-0 text-dimmed", dateInputSizeData.separator[resolved.size])}
              >
                {rangeSeparator ?? "–"}
              </span>
              {segments(1)}
            </>
          )}
        </DateInputControl>
        <Ark.HiddenInput index={0} />
        {range && <Ark.HiddenInput index={1} />}
      </Ark.Root>
    </DateInputVariantsContext.Provider>
  );
}
