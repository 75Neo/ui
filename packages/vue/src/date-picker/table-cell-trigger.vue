<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import {
  cn,
  datePickerDefaults,
  datePickerSizeData,
  datePickerTableCellTriggerCompoundData,
} from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerTableCellTrigger = cva(
  "flex w-full cursor-pointer items-center justify-center rounded-md text-toned tabular-nums transition-colors outline-none select-none focus-visible:outline-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-outside-range:text-dimmed data-unavailable:cursor-not-allowed data-unavailable:line-through data-unavailable:opacity-50",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: datePickerSizeData.tableCellTrigger,
    },
    compoundVariants: datePickerTableCellTriggerCompoundData,
    defaultVariants: datePickerDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDatePickerVariants();
const tableCellTriggerClass = computed(() =>
  cn(datePickerTableCellTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.TableCellTrigger data-slot="date-picker-table-cell-trigger" :class="tableCellTriggerClass">
    <slot />
  </Ark.TableCellTrigger>
</template>
