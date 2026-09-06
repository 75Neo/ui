<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerViewTrigger = cva(
  "inline-flex flex-1 cursor-pointer items-center justify-center rounded-md font-medium text-highlighted transition-colors outline-none hover:bg-elevated",
  {
    variants: { size: datePickerSizeData.viewTrigger },
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
const viewTriggerClass = computed(() =>
  cn(datePickerViewTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ViewTrigger data-slot="date-picker-view-trigger" :class="viewTriggerClass">
    <slot>
      <Ark.RangeText />
    </slot>
  </Ark.ViewTrigger>
</template>
