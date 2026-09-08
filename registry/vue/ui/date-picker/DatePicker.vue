<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DatePicker as Ark } from "@ark-ui/vue/date-picker";
import type { DateValue } from "@ark-ui/vue/date-picker";
import { cn } from "cn";
import { datePickerStyles as styles } from "@/registry/shared/lib/date-picker.styles";

interface DatePickerProps {
  defaultValue?: DateValue[];
  min?: DateValue;
  max?: DateValue;
  selectionMode?: "single" | "multiple" | "range";
  numOfMonths?: number;
  startOfWeek?: number;
  fixedWeeks?: boolean;
  closeOnSelect?: boolean;
  inline?: boolean;
  locale?: string;
  timeZone?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  name?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  fixedWeeks: undefined,
  closeOnSelect: undefined,
  inline: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
});

const value = defineModel<DateValue[]>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :min="props.min"
    :max="props.max"
    :selection-mode="props.selectionMode"
    :num-of-months="props.numOfMonths"
    :start-of-week="props.startOfWeek"
    :fixed-weeks="props.fixedWeeks"
    :close-on-select="props.closeOnSelect"
    :inline="props.inline"
    :locale="props.locale"
    :time-zone="props.timeZone"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :name="props.name"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
