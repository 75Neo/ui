<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerSwatches = cva("flex flex-wrap", {
  variants: { size: colorPickerSizeData.swatches },
  defaultVariants: colorPickerDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useColorPickerVariants();
const cls = computed(() => cn(colorPickerSwatches(variants), props.class as string | undefined));
</script>

<template>
  <Ark.SwatchGroup data-slot="color-picker-swatches" :class="cls">
    <slot />
  </Ark.SwatchGroup>
</template>
