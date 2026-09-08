<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerContentProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
