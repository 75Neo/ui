<script setup lang="ts">
import { DatePickerContext, parseDate } from "@ark-ui/vue/date-picker";
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
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
} from "@/components/vue";
</script>

<template>
  <div class="max-w-72">
    <DatePicker :default-value="[parseDate('2026-09-08')]">
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
            <DatePickerContext v-slot="picker">
              <DatePickerViewControl>
                <DatePickerPrevTrigger aria-label="Previous month">
                  <ChevronLeft />
                </DatePickerPrevTrigger>
                <DatePickerViewTrigger>{{ picker.visibleRangeText.start }}</DatePickerViewTrigger>
                <DatePickerNextTrigger aria-label="Next month">
                  <ChevronRight />
                </DatePickerNextTrigger>
              </DatePickerViewControl>

              <DatePickerTable>
                <DatePickerTableHead>
                  <DatePickerTableRow>
                    <DatePickerTableHeader v-for="day in picker.weekDays" :key="day.short">
                      {{ day.narrow }}
                    </DatePickerTableHeader>
                  </DatePickerTableRow>
                </DatePickerTableHead>
                <DatePickerTableBody>
                  <DatePickerTableRow v-for="(week, index) in picker.weeks" :key="index">
                    <DatePickerTableCell v-for="day in week" :key="day.toString()" :value="day">
                      <DatePickerTableCellTrigger>{{ day.day }}</DatePickerTableCellTrigger>
                    </DatePickerTableCell>
                  </DatePickerTableRow>
                </DatePickerTableBody>
              </DatePickerTable>
            </DatePickerContext>
          </DatePickerView>
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePicker>
  </div>
</template>
