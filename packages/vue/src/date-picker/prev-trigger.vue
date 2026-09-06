<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { ChevronLeft as ChevronLeftIcon } from "@lucide/vue";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerPrevTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: datePickerSizeData.prevTrigger },
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
const prevTriggerClass = computed(() =>
  cn(datePickerPrevTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.PrevTrigger data-slot="date-picker-prev-trigger" :class="prevTriggerClass">
    <slot>
      <component :is="ChevronLeftIcon" />
    </slot>
  </Ark.PrevTrigger>
</template>
