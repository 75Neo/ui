<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerSwatchIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerSwatchIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.SwatchIndicator :class="cn(styles.swatchIndicator(), props.class)">
    <slot />
  </Ark.SwatchIndicator>
</template>
