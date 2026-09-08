<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerTableHeaderProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerTableHeaderProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.TableHeader :class="cn(styles.tableHeader(), props.class)">
    <slot />
  </Ark.TableHeader>
</template>
