import { DatePickerContext, parseDate } from "@ark-ui/react/date-picker";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DatePicker,
  DatePickerContent,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from "@/components/react";

export default function DatePickerOverview() {
  return (
    <div className="max-w-72">
      <DatePicker defaultValue={[parseDate("2026-09-08")]}>
        <DatePickerLabel>Release date</DatePickerLabel>
        <DatePickerControl>
          <DatePickerInput />
          <DatePickerTrigger aria-label="Open the calendar">
            <CalendarDays />
          </DatePickerTrigger>
        </DatePickerControl>

        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerView view="day">
              <DatePickerContext>
                {(picker) => (
                  <>
                    <DatePickerViewControl>
                      <DatePickerPrevTrigger aria-label="Previous month">
                        <ChevronLeft />
                      </DatePickerPrevTrigger>
                      <DatePickerViewTrigger>{picker.visibleRangeText.start}</DatePickerViewTrigger>
                      <DatePickerNextTrigger aria-label="Next month">
                        <ChevronRight />
                      </DatePickerNextTrigger>
                    </DatePickerViewControl>

                    <DatePickerTable>
                      <DatePickerTableHead>
                        <DatePickerTableRow>
                          {picker.weekDays.map((day) => (
                            <DatePickerTableHeader key={day.short}>
                              {day.narrow}
                            </DatePickerTableHeader>
                          ))}
                        </DatePickerTableRow>
                      </DatePickerTableHead>
                      <DatePickerTableBody>
                        {picker.weeks.map((week, index) => (
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
              </DatePickerContext>
            </DatePickerView>
          </DatePickerContent>
        </DatePickerPositioner>
      </DatePicker>
    </div>
  );
}
