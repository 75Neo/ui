import { useMemo } from "react";
import type React from "react";
import { DatePicker as Ark, type DateValue } from "@ark-ui/react/date-picker";
import { Portal } from "@ark-ui/react/portal";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  cn,
  datePickerDefaults,
  datePickerSizeData,
  type DatePickerRootProps as DatePickerContract,
} from "@75neo/themes";
import { DatePickerVariantsContext } from "./variants";
import { DatePickerClearTrigger } from "./clear-trigger";
import { DatePickerContent } from "./content";
import { DatePickerControl } from "./control";
import { DatePickerInput } from "./input";
import { DatePickerLabel } from "./label";
import { DatePickerTrigger } from "./trigger";
import { DayView, MonthView, YearView } from "./views";

export type { DateValue };

/**
 * Props for the DatePicker.
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
export interface DatePickerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      | "value"
      | "defaultValue"
      | "onValueChange"
      | "onOpenChange"
      | "min"
      | "max"
      | "isDateUnavailable"
      | "ids"
    >,
    DatePickerContract<React.ReactNode> {
  children?: React.ReactNode;
}

export function DatePicker({
  color,
  size,
  label,
  placeholder,
  selectionMode,
  locale,
  timeZone,
  numOfMonths,
  startOfWeek,
  fixedWeeks,
  rangeSeparator,
  closeOnSelect,
  openOnClick,
  clearable,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  trailingIcon,
  clearIcon,
  prevIcon,
  nextIcon,
  value,
  defaultValue,
  onValueChange,
  onOpenChange,
  min,
  max,
  isDateUnavailable,
  ids,
  className,
  ...rest
}: DatePickerProps) {
  const resolved = {
    color: color ?? datePickerDefaults.color,
    size: size ?? datePickerDefaults.size,
  };
  const range = selectionMode === "range";
  const glyphs = useMemo(
    () => ({
      trailingIcon: trailingIcon ?? <Calendar />,
      clearIcon: clearIcon ?? <X />,
      prevIcon: prevIcon ?? <ChevronLeft />,
      nextIcon: nextIcon ?? <ChevronRight />,
    }),
    [trailingIcon, clearIcon, prevIcon, nextIcon],
  );

  return (
    <DatePickerVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="date-picker"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex w-full min-w-0 flex-col gap-1.5", className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onOpenChange={onOpenChange}
        selectionMode={selectionMode}
        locale={locale}
        timeZone={timeZone}
        numOfMonths={numOfMonths}
        startOfWeek={startOfWeek}
        fixedWeeks={fixedWeeks}
        closeOnSelect={closeOnSelect}
        openOnClick={openOnClick}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        name={name}
        min={min}
        max={max}
        isDateUnavailable={isDateUnavailable}
        ids={ids}
      >
        {label != null && <DatePickerLabel>{label}</DatePickerLabel>}
        <DatePickerControl>
          {/* A range is two dates and so two fields, each editable on its own. */}
          <DatePickerInput index={0} placeholder={placeholder} />
          {range && (
            <>
              <span
                data-slot="date-picker-separator"
                className={cn("shrink-0 text-dimmed", datePickerSizeData.separator[resolved.size])}
              >
                {rangeSeparator ?? "–"}
              </span>
              <DatePickerInput index={1} placeholder={placeholder} />
            </>
          )}
          {(clearable ?? true) && (
            <DatePickerClearTrigger>{glyphs.clearIcon}</DatePickerClearTrigger>
          )}
          <DatePickerTrigger>{glyphs.trailingIcon}</DatePickerTrigger>
        </DatePickerControl>
        {/* Portalled so an ancestor with `overflow: hidden` cannot clip the calendar.
            Ark's Portal renders inline on the server and moves the list on mount, so
            nothing about the first paint changes. */}
        <Portal>
          <DatePickerContent>
            <DayView glyphs={glyphs} />
            <MonthView glyphs={glyphs} />
            <YearView glyphs={glyphs} />
          </DatePickerContent>
        </Portal>
      </Ark.Root>
    </DatePickerVariantsContext.Provider>
  );
}
