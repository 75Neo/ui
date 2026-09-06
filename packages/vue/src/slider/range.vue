<script setup lang="ts">
import { computed } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cva } from "class-variance-authority";
import { cn, sliderColorData, sliderDefaults } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderRange = cva(
  "rounded-full group-data-[orientation=horizontal]/slider:h-full group-data-[orientation=vertical]/slider:w-full data-disabled:bg-accented",
  {
    variants: { color: sliderColorData.range },
    defaultVariants: sliderDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useSliderVariants();
const rangeClass = computed(() =>
  cn(sliderRange({ color: variants.color }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Range data-slot="slider-range" :class="rangeClass" />
</template>
