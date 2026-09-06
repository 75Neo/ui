<script setup lang="ts">
import type { Component } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "@lucide/vue";
import DatePickerTable from "./table.vue";
import DatePickerTableBody from "./table-body.vue";
import DatePickerTableCell from "./table-cell.vue";
import DatePickerTableCellTrigger from "./table-cell-trigger.vue";
import DatePickerTableRow from "./table-row.vue";
import DatePickerView from "./view.vue";
import DatePickerViewControl from "./view-control.vue";
import DatePickerPrevTrigger from "./prev-trigger.vue";
import DatePickerViewTrigger from "./view-trigger.vue";
import DatePickerNextTrigger from "./next-trigger.vue";

/**
 * A month or year cell grid, in Ark's shape.
 */
export interface DatePickerGridCell {
  label: string;
  value: number;
}

/** The slice of Ark's context the grids read. Structural, not imported. */
export interface DatePickerGridApi {
  getMonthsGrid(options?: { columns?: number; format?: "short" | "long" }): DatePickerGridCell[][];
  getYearsGrid(options?: { columns?: number }): DatePickerGridCell[][];
}

/**
 * The month or year view, which differ only in the grid they read. Internal:
 * callers compose the exported parts, never this.
 */
defineProps<{
  view: "month" | "year";
  rows: (api: DatePickerGridApi) => DatePickerGridCell[][];
  prevIcon?: Component;
  nextIcon?: Component;
}>();
</script>

<template>
  <DatePickerView :view="$props.view">
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
        <DatePickerTableBody>
          <DatePickerTableRow v-for="(row, index) in $props.rows(api)" :key="index">
            <DatePickerTableCell v-for="cell in row" :key="cell.value" :value="cell.value">
              <DatePickerTableCellTrigger>
                {{ cell.label }}
              </DatePickerTableCellTrigger>
            </DatePickerTableCell>
          </DatePickerTableRow>
        </DatePickerTableBody>
      </DatePickerTable>
    </Ark.Context>
  </DatePickerView>
</template>
