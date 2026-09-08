<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerTableHeadProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerTableHeadProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = datePicker();
</script>

<template>
  <Ark.TableHead :class="cn(styles.tableHead(), props.class)">
    <slot />
  </Ark.TableHead>
</template>
