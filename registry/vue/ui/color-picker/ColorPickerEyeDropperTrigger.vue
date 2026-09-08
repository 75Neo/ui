<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerEyeDropperTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerEyeDropperTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = colorPicker();
</script>

<template>
  <Ark.EyeDropperTrigger :class="cn(styles.eyeDropperTrigger(), props.class)">
    <slot />
  </Ark.EyeDropperTrigger>
</template>
