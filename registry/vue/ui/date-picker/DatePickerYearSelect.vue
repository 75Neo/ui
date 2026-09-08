<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerYearSelectProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerYearSelectProps>();

const styles = datePicker();
</script>

<template>
  <Ark.YearSelect :class="cn(styles.yearSelect(), props.class)" />
</template>
