import type React from "react";
import { DateInput as Ark, type DateInputRootProps } from "@ark-ui/react/date-input";
import {
  dateInput,
  dateInputLiteralText,
  type DateInputProps as DateInputContract,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the DateInput.
 *
 * @remarks
 * `color` is dropped from the HTML attributes, because the legacy presentational
 * attribute would collide with the variant of the same name. `defaultValue` goes with
 * it, since the attribute admits a string where Ark's root takes an array of
 * `DateValue`.
 *
 * The value props come from Ark, because React and Vue spell a controlled date too
 * differently to share one type. `min` and `max` come from there too: they are
 * `DateValue`, and that type belongs to this package's own copy of Ark.
 */
export interface DateInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<
      DateInputRootProps,
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
  ui,
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
  const theme = useResolvedTheme(dateInput, "dateInput", { ui, color, size }, className);
  const range = selectionMode === "range";

  /*
   * One group per date, so a range is two of them. `SegmentContext` reads its index off
   * the group it sits in, which is why the segments cannot be hoisted out of this.
   *
   * A literal segment's text is rewritten on the way in, because ICU's idea of the
   * space before AM and PM differs between the runtime that renders the page and the one
   * that hydrates it. `dateInputLiteralText` says why, and both adapters call it so the
   * two runs agree.
   */
  const segments = (index: number) => (
    <Ark.SegmentGroup index={index} data-slot="segmentGroup" className={theme.class.segmentGroup}>
      <Ark.SegmentContext>
        {(segment) => (
          <Ark.Segment
            segment={
              segment.type === "literal"
                ? { ...segment, text: dateInputLiteralText(segment.text) }
                : segment
            }
            data-slot="segment"
            className={theme.class.segment}
          />
        )}
      </Ark.SegmentContext>
    </Ark.SegmentGroup>
  );

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      selectionMode={selectionMode}
      granularity={granularity}
      locale={locale}
      timeZone={timeZone}
      shouldForceLeadingZeros={shouldForceLeadingZeros}
      hideTimeZone={hideTimeZone}
      min={min}
      max={max}
      isDateUnavailable={isDateUnavailable}
      placeholderValue={placeholderValue}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      required={required}
      name={name}
      ids={ids}
    >
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}

      <Ark.Control data-slot="control" className={theme.class.control}>
        {leadingIcon != null && (
          <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
            {leadingIcon}
          </span>
        )}

        {segments(0)}

        {range && (
          <>
            <span data-slot="separator" className={theme.class.separator}>
              {rangeSeparator ?? "–"}
            </span>
            {segments(1)}
          </>
        )}
      </Ark.Control>

      <Ark.HiddenInput index={0} />
      {range && <Ark.HiddenInput index={1} />}
    </Ark.Root>
  );
}
