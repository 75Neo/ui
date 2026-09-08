<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerViewProps {
  view: "day" | "month" | "year";
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerViewProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = datePicker();
</script>

<template>
  <Ark.View :view="props.view" :class="cn(styles.view(), props.class)">
    <slot />
  </Ark.View>
</template>
