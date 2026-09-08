<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerPrevTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerPrevTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = datePicker();
</script>

<template>
  <Ark.PrevTrigger :class="cn(styles.prevTrigger(), props.class)">
    <slot />
  </Ark.PrevTrigger>
</template>
