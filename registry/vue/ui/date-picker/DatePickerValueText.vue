<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerValueTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerValueTextProps>();

const styles = datePicker();
</script>

<template>
  <Ark.ValueText :class="cn(styles.valueText(), props.class)" />
</template>
