<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DateInput as Ark } from "@ark-ui/vue/date-input";
import type { DateInputRootProps } from "@ark-ui/vue/date-input";
import { cn } from "cn";
import { dateInputStyles as styles } from "@/registry/shared/lib/date-input.styles";

interface DateInputProps {
  defaultValue?: DateInputRootProps["value"];
  min?: NonNullable<DateInputRootProps["min"]>;
  max?: NonNullable<DateInputRootProps["max"]>;
  granularity?: "day" | "hour" | "minute" | "second";
  selectionMode?: "single" | "range";
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  locale?: string;
  timeZone?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DateInputProps>(), {
  hideTimeZone: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

const value = defineModel<DateInputRootProps["value"]>();

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
    :granularity="props.granularity"
    :selection-mode="props.selectionMode"
    :hour-cycle="props.hourCycle"
    :hide-time-zone="props.hideTimeZone"
    :locale="props.locale"
    :time-zone="props.timeZone"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :form="props.form"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
