<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerViewTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerViewTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ViewTrigger :class="cn(styles.viewTrigger(), props.class)">
    <slot />
  </Ark.ViewTrigger>
</template>
