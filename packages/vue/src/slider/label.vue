<script setup lang="ts">
import { computed } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cva } from "class-variance-authority";
import { cn, sliderDefaults, sliderSizeData } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderLabel = cva("min-w-0 truncate font-medium text-highlighted select-none", {
  variants: { size: sliderSizeData.label },
  defaultVariants: sliderDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSliderVariants();
const labelClass = computed(() =>
  cn(sliderLabel({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Label data-slot="slider-label" :class="labelClass">
    <slot />
  </Ark.Label>
</template>
