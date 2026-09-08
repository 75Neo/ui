<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerTableCellProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerTableCellProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = datePicker();
</script>

<template>
  <Ark.TableCell :class="cn(styles.tableCell(), props.class)">
    <slot />
  </Ark.TableCell>
</template>
