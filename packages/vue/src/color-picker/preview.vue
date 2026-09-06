<script setup lang="ts">
import { computed } from "vue";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerPreview = cva("relative shrink-0 overflow-hidden rounded-md ring ring-accented", {
  variants: { size: colorPickerSizeData.preview },
  defaultVariants: colorPickerDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useColorPickerVariants();
const cls = computed(() => cn(colorPickerPreview(variants), props.class as string | undefined));
</script>

<template>
  <div data-slot="color-picker-preview" :class="cls">
    <slot />
  </div>
</template>
