<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerClearTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerClearTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = datePicker();
</script>

<template>
  <Ark.ClearTrigger :class="cn(styles.clearTrigger(), props.class)">
    <slot />
  </Ark.ClearTrigger>
</template>
