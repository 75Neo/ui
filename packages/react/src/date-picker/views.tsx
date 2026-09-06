import type React from "react";
import { DatePicker as Ark, type UseDatePickerContext } from "@ark-ui/react/date-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DatePickerTable } from "./table";
import { DatePickerTableBody } from "./table-body";
import { DatePickerTableCell } from "./table-cell";
import { DatePickerTableCellTrigger } from "./table-cell-trigger";
import { DatePickerTableHead } from "./table-head";
import { DatePickerTableHeader } from "./table-header";
import { DatePickerTableRow } from "./table-row";
import { DatePickerView } from "./view";
import { DatePickerViewControl } from "./view-control";
import { DatePickerPrevTrigger } from "./prev-trigger";
import { DatePickerViewTrigger } from "./view-trigger";
import { DatePickerNextTrigger } from "./next-trigger";

export interface DatePickerViewGlyphs {
  prevIcon: React.ReactNode;
  nextIcon: React.ReactNode;
}

/**
 * The month name and the two arrows around it, which every view shares. Internal:
 * callers compose the exported parts, never this.
 *
 * @remarks
 * Ark renders the day, month and year views as siblings and each needs its own. The
 * trigger in the middle climbs a view on every press, which is how a reader reaches
 * a year eight decades back without pressing the arrow ninety-six times.
 */
function SharedViewControl({ glyphs }: { glyphs: DatePickerViewGlyphs }) {
  return (
    <DatePickerViewControl>
      <DatePickerPrevTrigger>{glyphs.prevIcon ?? <ChevronLeft />}</DatePickerPrevTrigger>
      <DatePickerViewTrigger />
      <DatePickerNextTrigger>{glyphs.nextIcon ?? <ChevronRight />}</DatePickerNextTrigger>
    </DatePickerViewControl>
  );
}

/**
 * The month or year view, which differ only in the grid they read.
 *
 * @param rows - Reads the grid off Ark's context, four to a row.
 */
function GridView({
  view,
  glyphs,
  rows,
}: {
  view: "month" | "year";
  glyphs: DatePickerViewGlyphs;
  rows: (api: UseDatePickerContext) => { label: string; value: number }[][];
}) {
  return (
    <DatePickerView view={view}>
      <Ark.Context>
        {(api) => (
          <>
            <SharedViewControl glyphs={glyphs} />
            <DatePickerTable>
              <DatePickerTableBody>
                {rows(api).map((row, index) => (
                  <DatePickerTableRow key={index}>
                    {row.map((cell) => (
                      <DatePickerTableCell key={cell.value} value={cell.value}>
                        <DatePickerTableCellTrigger>{cell.label}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    ))}
                  </DatePickerTableRow>
                ))}
              </DatePickerTableBody>
            </DatePickerTable>
          </>
        )}
      </Ark.Context>
    </DatePickerView>
  );
}

export function DayView({ glyphs }: { glyphs: DatePickerViewGlyphs }) {
  return (
    <DatePickerView view="day">
      <Ark.Context>
        {(api) => (
          <>
            <SharedViewControl glyphs={glyphs} />
            <DatePickerTable>
              <DatePickerTableHead>
                <DatePickerTableRow>
                  {api.weekDays.map((weekDay) => (
                    <DatePickerTableHeader key={weekDay.long}>
                      {weekDay.narrow}
                    </DatePickerTableHeader>
                  ))}
                </DatePickerTableRow>
              </DatePickerTableHead>
              <DatePickerTableBody>
                {api.weeks.map((week, index) => (
                  <DatePickerTableRow key={index}>
                    {week.map((day) => (
                      <DatePickerTableCell key={day.toString()} value={day}>
                        <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                      </DatePickerTableCell>
                    ))}
                  </DatePickerTableRow>
                ))}
              </DatePickerTableBody>
            </DatePickerTable>
          </>
        )}
      </Ark.Context>
    </DatePickerView>
  );
}

export function MonthView({ glyphs }: { glyphs: DatePickerViewGlyphs }) {
  return (
    <GridView
      view="month"
      glyphs={glyphs}
      rows={(api) => api.getMonthsGrid({ columns: 4, format: "short" })}
    />
  );
}

export function YearView({ glyphs }: { glyphs: DatePickerViewGlyphs }) {
  return <GridView view="year" glyphs={glyphs} rows={(api) => api.getYearsGrid({ columns: 4 })} />;
}
