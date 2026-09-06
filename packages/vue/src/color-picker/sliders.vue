<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerSliders = cva("flex items-center", {
  variants: { size: colorPickerSizeData.sliders },
  defaultVariants: colorPickerDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useColorPickerVariants();
const cls = computed(() => cn(colorPickerSliders(variants), props.class as string | undefined));
</script>

<template>
  <div data-slot="color-picker-sliders" :class="cls">
    <slot />
  </div>
</template>
