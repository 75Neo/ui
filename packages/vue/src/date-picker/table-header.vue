<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerTableHeader = cva("font-medium text-dimmed", {
  variants: { size: datePickerSizeData.tableHeader },
  defaultVariants: datePickerDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDatePickerVariants();
const tableHeaderClass = computed(() =>
  cn(datePickerTableHeader(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.TableHeader data-slot="date-picker-table-header" :class="tableHeaderClass">
    <slot />
  </Ark.TableHeader>
</template>
