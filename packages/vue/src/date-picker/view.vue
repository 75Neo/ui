<script setup lang="ts">
import { computed } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cva } from "class-variance-authority";
import { cn, datePickerDefaults, datePickerSizeData } from "@75neo/themes";
import { useDatePickerVariants } from "./variants";

const datePickerView = cva("flex flex-col [&[hidden]]:hidden", {
  variants: { size: datePickerSizeData.view },
  defaultVariants: datePickerDefaults,
});

const props = defineProps<{
  class?: unknown;
  /** Which grid this view draws: days, months or years. */
  view: "day" | "month" | "year";
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useDatePickerVariants();
const viewClass = computed(() => cn(datePickerView(variants), props.class as string | undefined));
</script>

<template>
  <Ark.View :view="props.view" data-slot="date-picker-view" :class="viewClass">
    <slot />
  </Ark.View>
</template>
