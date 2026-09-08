<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerTableRowProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerTableRowProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = datePicker();
</script>

<template>
  <Ark.TableRow :class="cn(styles.tableRow(), props.class)">
    <slot />
  </Ark.TableRow>
</template>
