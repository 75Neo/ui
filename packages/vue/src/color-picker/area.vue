<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerArea = cva("relative touch-none rounded-md ring ring-accented", {
  variants: { size: colorPickerSizeData.area },
  defaultVariants: colorPickerDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useColorPickerVariants();
const cls = computed(() => cn(colorPickerArea(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Area data-slot="color-picker-area" :class="cls">
    <slot />
  </Ark.Area>
</template>
