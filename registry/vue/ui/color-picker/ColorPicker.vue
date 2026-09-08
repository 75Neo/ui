<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import type { Color, ColorPickerRootProps } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerProps {
  defaultValue?: Color;
  format?: ColorPickerRootProps["format"];
  defaultFormat?: ColorPickerRootProps["format"];
  closeOnSelect?: boolean;
  openAutoFocus?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  closeOnSelect: undefined,
  openAutoFocus: undefined,
  disabled: undefined,
  invalid: undefined,
  readOnly: undefined,
  required: undefined,
});

const value = defineModel<Color>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :format="props.format"
    :default-format="props.defaultFormat"
    :close-on-select="props.closeOnSelect"
    :open-auto-focus="props.openAutoFocus"
    :disabled="props.disabled"
    :invalid="props.invalid"
    :read-only="props.readOnly"
    :required="props.required"
    :name="props.name"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
