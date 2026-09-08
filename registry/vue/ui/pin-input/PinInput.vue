<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PinInput as Ark } from "@ark-ui/vue/pin-input";
import { cn } from "cn";
import {
  pinInputStyles as styles,
  type PinInputSize,
} from "@/registry/shared/lib/pin-input.styles";

interface PinInputProps {
  defaultValue?: string[];
  count?: number;
  type?: "alphanumeric" | "numeric" | "alphabetic";
  otp?: boolean;
  mask?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  blurOnComplete?: boolean;
  selectOnFocus?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  size?: PinInputSize;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PinInputProps>(), {
  size: "md",
  otp: undefined,
  mask: undefined,
  autoFocus: undefined,
  blurOnComplete: undefined,
  selectOnFocus: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

const value = defineModel<string[]>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :count="props.count"
    :type="props.type"
    :otp="props.otp"
    :mask="props.mask"
    :placeholder="props.placeholder"
    :auto-focus="props.autoFocus"
    :blur-on-complete="props.blurOnComplete"
    :select-on-focus="props.selectOnFocus"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :form="props.form"
    :data-size="props.size"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
