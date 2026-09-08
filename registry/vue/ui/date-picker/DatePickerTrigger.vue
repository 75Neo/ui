<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = datePicker();
</script>

<template>
  <Ark.Trigger :class="cn(styles.trigger(), props.class)">
    <slot />
  </Ark.Trigger>
</template>
