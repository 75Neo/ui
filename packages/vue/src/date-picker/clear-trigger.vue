<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { X as XIcon } from "@lucide/vue";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerClearTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: datePickerSizeData.clearTrigger },
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
const clearTriggerClass = computed(() =>
  cn(datePickerClearTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.ClearTrigger data-slot="date-picker-clear-trigger" :class="clearTriggerClass">
    <slot>
      <component :is="XIcon" />
    </slot>
  </Ark.ClearTrigger>
</template>
