<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerTableCellTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerTableCellTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.TableCellTrigger :class="cn(styles.tableCellTrigger(), props.class)">
    <slot />
  </Ark.TableCellTrigger>
</template>
