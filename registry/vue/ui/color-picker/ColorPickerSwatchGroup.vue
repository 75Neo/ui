<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerSwatchGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerSwatchGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = colorPicker();
</script>

<template>
  <Ark.SwatchGroup :class="cn(styles.swatchGroup(), props.class)">
    <slot />
  </Ark.SwatchGroup>
</template>
