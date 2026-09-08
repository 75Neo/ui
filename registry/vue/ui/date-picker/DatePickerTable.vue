<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerTableProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerTableProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Table :class="cn(styles.table(), props.class)">
    <slot />
  </Ark.Table>
</template>
