<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { NumberInput as Ark } from "@ark-ui/vue/number-input";
import { cn } from "cn";
import { numberInput, type NumberInputSize } from "@/registry/shared/lib/number-input.styles";

interface NumberInputProps {
  defaultValue?: string;
  min?: number;
  max?: number;
  step?: number;
  largeStep?: number;
  allowMouseWheel?: boolean;
  allowOverflow?: boolean;
  clampValueOnBlur?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  locale?: string;
  formatOptions?: Intl.NumberFormatOptions;
  size?: NumberInputSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<NumberInputProps>(), {
  size: "md",
  allowMouseWheel: undefined,
  allowOverflow: undefined,
  clampValueOnBlur: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

const value = defineModel<string>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = numberInput();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :large-step="props.largeStep"
    :allow-mouse-wheel="props.allowMouseWheel"
    :allow-overflow="props.allowOverflow"
    :clamp-value-on-blur="props.clampValueOnBlur"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :form="props.form"
    :locale="props.locale"
    :format-options="props.formatOptions"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
