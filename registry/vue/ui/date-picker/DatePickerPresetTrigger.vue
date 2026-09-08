<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import type { DatePickerPresetTriggerProps as ArkPresetTriggerProps } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePicker } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerPresetTriggerProps {
  value: ArkPresetTriggerProps["value"];
  class?: HTMLAttributes["class"];
}

const props = defineProps<DatePickerPresetTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = datePicker();
</script>

<template>
  <Ark.PresetTrigger :value="props.value" :class="cn(styles.presetTrigger(), props.class)">
    <slot />
  </Ark.PresetTrigger>
</template>
