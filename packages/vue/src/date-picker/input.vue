<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerInput = cva(
  "min-w-0 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: { size: datePickerSizeData.input },
    defaultVariants: datePickerDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** Which field this is: the date, or the end of a range. */
  index?: number;
  /** Shown while the field is empty. */
  placeholder?: string;
}>();

const variants = useDatePickerVariants();
const inputClass = computed(() => cn(datePickerInput(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Input
    data-slot="date-picker-input"
    :class="inputClass"
    :index="props.index ?? 0"
    :placeholder="props.placeholder"
  />
</template>
