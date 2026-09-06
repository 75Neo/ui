<script setup lang="ts">
import type { Component } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "@lucide/vue";
import DatePickerTable from "./table.vue";
import DatePickerTableBody from "./table-body.vue";
import DatePickerTableCell from "./table-cell.vue";
import DatePickerTableCellTrigger from "./table-cell-trigger.vue";
import DatePickerTableHead from "./table-head.vue";
import DatePickerTableHeader from "./table-header.vue";
import DatePickerTableRow from "./table-row.vue";
import DatePickerView from "./view.vue";
import DatePickerViewControl from "./view-control.vue";
import DatePickerPrevTrigger from "./prev-trigger.vue";
import DatePickerViewTrigger from "./view-trigger.vue";
import DatePickerNextTrigger from "./next-trigger.vue";

/**
 * The day grid. Internal: callers compose the exported parts, never this.
 */
defineProps<{
  prevIcon?: Component;
  nextIcon?: Component;
}>();
</script>

<template>
  <DatePickerView view="day">
    <Ark.Context v-slot="api">
      <DatePickerViewControl>
        <DatePickerPrevTrigger>
          <component :is="$props.prevIcon ?? ChevronLeftIcon" />
        </DatePickerPrevTrigger>
        <DatePickerViewTrigger />
        <DatePickerNextTrigger>
          <component :is="$props.nextIcon ?? ChevronRightIcon" />
        </DatePickerNextTrigger>
      </DatePickerViewControl>
      <DatePickerTable>
        <DatePickerTableHead>
          <DatePickerTableRow>
            <DatePickerTableHeader v-for="weekDay in api.weekDays" :key="weekDay.long">
              {{ weekDay.narrow }}
            </DatePickerTableHeader>
          </DatePickerTableRow>
        </DatePickerTableHead>
        <DatePickerTableBody>
          <DatePickerTableRow v-for="(week, index) in api.weeks" :key="index">
            <DatePickerTableCell v-for="day in week" :key="day.toString()" :value="day">
              <DatePickerTableCellTrigger>
                {{ day.day }}
              </DatePickerTableCellTrigger>
            </DatePickerTableCell>
          </DatePickerTableRow>
        </DatePickerTableBody>
      </DatePickerTable>
    </Ark.Context>
  </DatePickerView>
</template>
