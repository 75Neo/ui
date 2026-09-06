<script setup lang="ts">
import { computed } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cva } from "class-variance-authority";
import { cn, sliderDefaults, sliderSizeData } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderControl = cva(
  "relative flex touch-none select-none group-data-[orientation=horizontal]/slider:w-full group-data-[orientation=horizontal]/slider:items-center group-data-[orientation=vertical]/slider:h-full group-data-[orientation=vertical]/slider:justify-center data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: { size: sliderSizeData.control },
    defaultVariants: sliderDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSliderVariants();
const controlClass = computed(() =>
  cn(sliderControl({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Control data-slot="slider-control" :class="controlClass">
    <slot />
  </Ark.Control>
</template>
