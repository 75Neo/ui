<script setup lang="ts">
import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
import { DatePickerContext, parseDate } from "@ark-ui/vue/date-picker";
import DatePicker from "@/registry/vue/ui/date-picker/DatePicker.vue";
import DatePickerContent from "@/registry/vue/ui/date-picker/DatePickerContent.vue";
import DatePickerControl from "@/registry/vue/ui/date-picker/DatePickerControl.vue";
import DatePickerInput from "@/registry/vue/ui/date-picker/DatePickerInput.vue";
import DatePickerLabel from "@/registry/vue/ui/date-picker/DatePickerLabel.vue";
import DatePickerNextTrigger from "@/registry/vue/ui/date-picker/DatePickerNextTrigger.vue";
import DatePickerPositioner from "@/registry/vue/ui/date-picker/DatePickerPositioner.vue";
import DatePickerPrevTrigger from "@/registry/vue/ui/date-picker/DatePickerPrevTrigger.vue";
import DatePickerTable from "@/registry/vue/ui/date-picker/DatePickerTable.vue";
import DatePickerTableBody from "@/registry/vue/ui/date-picker/DatePickerTableBody.vue";
import DatePickerTableCell from "@/registry/vue/ui/date-picker/DatePickerTableCell.vue";
import DatePickerTableCellTrigger from "@/registry/vue/ui/date-picker/DatePickerTableCellTrigger.vue";
import DatePickerTableHead from "@/registry/vue/ui/date-picker/DatePickerTableHead.vue";
import DatePickerTableHeader from "@/registry/vue/ui/date-picker/DatePickerTableHeader.vue";
import DatePickerTableRow from "@/registry/vue/ui/date-picker/DatePickerTableRow.vue";
import DatePickerTrigger from "@/registry/vue/ui/date-picker/DatePickerTrigger.vue";
import DatePickerView from "@/registry/vue/ui/date-picker/DatePickerView.vue";
import DatePickerViewControl from "@/registry/vue/ui/date-picker/DatePickerViewControl.vue";
import DatePickerViewTrigger from "@/registry/vue/ui/date-picker/DatePickerViewTrigger.vue";
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
