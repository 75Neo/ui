<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerRangeTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerRangeTextProps>();
</script>

<template>
  <Ark.RangeText :class="cn(styles.rangeText(), props.class)" />
</template>
