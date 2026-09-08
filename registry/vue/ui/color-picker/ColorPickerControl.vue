<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

interface ColorPickerControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ColorPickerControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = colorPicker();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
