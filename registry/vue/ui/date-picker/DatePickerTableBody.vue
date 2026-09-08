<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerTableBodyProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerTableBodyProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.TableBody :class="cn(styles.tableBody(), props.class)">
    <slot />
  </Ark.TableBody>
</template>
