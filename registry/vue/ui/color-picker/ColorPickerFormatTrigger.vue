<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerFormatTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerFormatTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.FormatTrigger :class="cn(styles.formatTrigger(), props.class)">
    <slot />
  </Ark.FormatTrigger>
</template>
