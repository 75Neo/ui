<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerMonthSelectProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerMonthSelectProps>();
</script>

<template>
  <Ark.MonthSelect :class="cn(styles.monthSelect(), props.class)" />
</template>
