import type React from "react";
import {
  DatePicker as Ark,
  type DatePickerRootProps,
  type UseDatePickerContext,
} from "@ark-ui/react/date-picker";
import { Portal } from "@ark-ui/react/portal";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ResolvedTheme } from "@75neo/core";
import { datePicker, type DatePickerProps as DatePickerContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/** The resolved classes every part of the calendar reads from. */
type Theme = ResolvedTheme<typeof datePicker>;

/**
 * Props for the DatePicker.
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
export interface DatePickerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<
      DatePickerRootProps,
      | "value"
      | "defaultValue"
      | "onValueChange"
      | "onOpenChange"
      | "min"
      | "max"
      | "isDateUnavailable"
      | "ids"
    >,
    DatePickerContract<React.ReactNode> {}

/**
 * The month name and the two arrows around it, which every view shares.
 *
 * @remarks
 * A local component rather than three copies, because Ark renders the day, month and
 * year views as siblings and each needs its own. The trigger in the middle climbs a
 * view on every press, which is how a reader reaches a year eight decades back without
 * pressing the arrow ninety-six times.
 */
function ViewControl({
  theme,
  prevIcon,
  nextIcon,
}: {
  theme: Theme;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
}) {
  return (
    <Ark.ViewControl data-slot="viewControl" className={theme.class.viewControl}>
      <Ark.PrevTrigger data-slot="prevTrigger" className={theme.class.prevTrigger}>
        {prevIcon ?? <ChevronLeft />}
      </Ark.PrevTrigger>
      <Ark.ViewTrigger data-slot="viewTrigger" className={theme.class.viewTrigger}>
        <Ark.RangeText />
      </Ark.ViewTrigger>
      <Ark.NextTrigger data-slot="nextTrigger" className={theme.class.nextTrigger}>
        {nextIcon ?? <ChevronRight />}
      </Ark.NextTrigger>
    </Ark.ViewControl>
  );
}

/**
 * The month or year view, which differ only in the grid they read.
 *
 * @param rows - Reads the grid off Ark's context, four to a row.
 */
function GridView({
  view,
  theme,
  prevIcon,
  nextIcon,
  rows,
}: {
  view: "month" | "year";
  theme: Theme;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  rows: (api: UseDatePickerContext) => { label: string; value: number }[][];
}) {
  return (
    <Ark.View view={view} data-slot="view" className={theme.class.view}>
      <Ark.Context>
        {(api) => (
          <>
            <ViewControl theme={theme} prevIcon={prevIcon} nextIcon={nextIcon} />
            <Ark.Table data-slot="table" className={theme.class.table}>
              <Ark.TableBody data-slot="tableBody" className={theme.class.tableBody}>
                {rows(api).map((row, index) => (
                  <Ark.TableRow key={index} data-slot="tableRow" className={theme.class.tableRow}>
                    {row.map((cell) => (
                      <Ark.TableCell
                        key={cell.value}
                        value={cell.value}
                        data-slot="tableCell"
                        className={theme.class.tableCell}
                      >
                        <Ark.TableCellTrigger
                          data-slot="tableCellTrigger"
                          className={theme.class.tableCellTrigger}
                        >
                          {cell.label}
                        </Ark.TableCellTrigger>
                      </Ark.TableCell>
                    ))}
                  </Ark.TableRow>
                ))}
              </Ark.TableBody>
            </Ark.Table>
          </>
        )}
      </Ark.Context>
    </Ark.View>
  );
}

export function DatePicker({
  ui,
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
  closeOnSelect,
  openOnClick,
  clearable,
  rangeSeparator,
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
  const theme = useResolvedTheme(datePicker, "datePicker", { ui, color, size }, className);
  const range = selectionMode === "range";

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
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
      placeholder={placeholder}
      min={min}
      max={max}
      isDateUnavailable={isDateUnavailable}
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
        {/* A range is two dates and so two fields, each editable on its own. */}
        <Ark.Input index={0} data-slot="input" className={theme.class.input} />
        {range && (
          <>
            <span data-slot="separator" className={theme.class.separator}>
              {rangeSeparator ?? "–"}
            </span>
            <Ark.Input index={1} data-slot="input" className={theme.class.input} />
          </>
        )}

        {(clearable ?? true) && (
          <Ark.ClearTrigger data-slot="clearTrigger" className={theme.class.clearTrigger}>
            {clearIcon ?? <X />}
          </Ark.ClearTrigger>
        )}
        <Ark.Trigger data-slot="trigger" className={theme.class.trigger}>
          {trailingIcon ?? <Calendar />}
        </Ark.Trigger>
      </Ark.Control>

      {/* Portalled so an ancestor with `overflow: hidden` cannot clip the calendar.
          Ark's Portal renders inline on the server and moves it on mount, so nothing
          about the first paint changes. */}
      <Portal>
        <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
          <Ark.Content data-slot="content" className={theme.class.content}>
            <Ark.View view="day" data-slot="view" className={theme.class.view}>
              <Ark.Context>
                {(api) => (
                  <>
                    <ViewControl theme={theme} prevIcon={prevIcon} nextIcon={nextIcon} />
                    <Ark.Table data-slot="table" className={theme.class.table}>
                      <Ark.TableHead data-slot="tableHead" className={theme.class.tableHead}>
                        <Ark.TableRow data-slot="tableRow" className={theme.class.tableRow}>
                          {api.weekDays.map((weekDay) => (
                            <Ark.TableHeader
                              key={weekDay.long}
                              data-slot="tableHeader"
                              className={theme.class.tableHeader}
                            >
                              {weekDay.narrow}
                            </Ark.TableHeader>
                          ))}
                        </Ark.TableRow>
                      </Ark.TableHead>
                      <Ark.TableBody data-slot="tableBody" className={theme.class.tableBody}>
                        {api.weeks.map((week, index) => (
                          <Ark.TableRow
                            key={index}
                            data-slot="tableRow"
                            className={theme.class.tableRow}
                          >
                            {week.map((day) => (
                              <Ark.TableCell
                                key={day.toString()}
                                value={day}
                                data-slot="tableCell"
                                className={theme.class.tableCell}
                              >
                                <Ark.TableCellTrigger
                                  data-slot="tableCellTrigger"
                                  className={theme.class.tableCellTrigger}
                                >
                                  {day.day}
                                </Ark.TableCellTrigger>
                              </Ark.TableCell>
                            ))}
                          </Ark.TableRow>
                        ))}
                      </Ark.TableBody>
                    </Ark.Table>
                  </>
                )}
              </Ark.Context>
            </Ark.View>

            <GridView
              view="month"
              theme={theme}
              prevIcon={prevIcon}
              nextIcon={nextIcon}
              rows={(api) => api.getMonthsGrid({ columns: 4, format: "short" })}
            />

            <GridView
              view="year"
              theme={theme}
              prevIcon={prevIcon}
              nextIcon={nextIcon}
              rows={(api) => api.getYearsGrid({ columns: 4 })}
            />
          </Ark.Content>
        </Ark.Positioner>
      </Portal>
    </Ark.Root>
  );
}
