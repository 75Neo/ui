<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import type { Color } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerSwatchTriggerProps {
  value: string | Color;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ColorPickerSwatchTriggerProps>(), {
  disabled: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.SwatchTrigger
    :value="props.value"
    :disabled="props.disabled"
    :class="cn(styles.swatchTrigger(), props.class)"
  >
    <slot />
  </Ark.SwatchTrigger>
</template>
