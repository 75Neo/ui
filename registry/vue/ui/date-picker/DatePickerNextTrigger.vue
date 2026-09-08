<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerNextTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerNextTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = datePicker();
</script>

<template>
  <Ark.NextTrigger :class="cn(styles.nextTrigger(), props.class)">
    <slot />
  </Ark.NextTrigger>
</template>
