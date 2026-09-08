<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerInputProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerInputProps>();
</script>

<template>
  <Ark.Input :class="cn(styles.input(), props.class)" />
</template>
