<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { Calendar as CalendarIcon } from "@lucide/vue";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: datePickerSizeData.trigger },
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
const triggerClass = computed(() =>
  cn(datePickerTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Trigger data-slot="date-picker-trigger" :class="triggerClass">
    <slot>
      <component :is="CalendarIcon" />
    </slot>
  </Ark.Trigger>
</template>
