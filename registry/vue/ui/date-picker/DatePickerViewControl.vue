<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerViewControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerViewControlProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ViewControl :class="cn(styles.viewControl(), props.class)">
    <slot />
  </Ark.ViewControl>
</template>
