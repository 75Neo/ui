<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import type { DatePickerTableCellProps as ArkTableCellProps } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerTableCellProps {
  value: ArkTableCellProps["value"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerTableCellProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.TableCell :value="props.value" :class="cn(styles.tableCell(), props.class)">
    <slot />
  </Ark.TableCell>
</template>
