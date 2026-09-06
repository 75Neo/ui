<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { ChevronRight as ChevronRightIcon } from "@lucide/vue";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerNextTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
  {
    variants: { size: datePickerSizeData.nextTrigger },
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
const nextTriggerClass = computed(() =>
  cn(datePickerNextTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.NextTrigger data-slot="date-picker-next-trigger" :class="nextTriggerClass">
    <slot>
      <component :is="ChevronRightIcon" />
    </slot>
  </Ark.NextTrigger>
</template>
