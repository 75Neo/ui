<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerSwatchTrigger = cva(
  "cursor-pointer rounded-md ring-offset-2 ring-offset-bg outline-none focus-visible:outline-3 disabled:cursor-not-allowed data-[state=checked]:ring-2",
  {
    variants: { size: colorPickerSizeData.swatchTrigger },
    defaultVariants: colorPickerDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
  /** The preset color this swatch applies. */
  value: string;
}>();

const variants = useColorPickerVariants();
const cls = computed(() =>
  cn(colorPickerSwatchTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.SwatchTrigger data-slot="color-picker-swatch-trigger" :class="cls" :value="props.value" />
</template>
