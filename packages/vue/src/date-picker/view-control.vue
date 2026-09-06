<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerViewControl = cva("flex items-center justify-between", {
  variants: { size: datePickerSizeData.viewControl },
  defaultVariants: datePickerDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDatePickerVariants();
const viewControlClass = computed(() =>
  cn(datePickerViewControl(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ViewControl data-slot="date-picker-view-control" :class="viewControlClass">
    <slot />
  </Ark.ViewControl>
</template>
