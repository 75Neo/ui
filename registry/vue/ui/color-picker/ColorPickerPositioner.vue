<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = colorPicker();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
