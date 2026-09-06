<script setup lang="ts">
import { computed } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cva } from "class-variance-authority";
import { cn, sliderDefaults, sliderSizeData } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderTrack = cva(
  "overflow-hidden rounded-full bg-accented group-data-[orientation=horizontal]/slider:w-full group-data-[orientation=vertical]/slider:h-full",
  {
    variants: { size: sliderSizeData.track },
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
const trackClass = computed(() =>
  cn(sliderTrack({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Track data-slot="slider-track" :class="trackClass">
    <slot />
  </Ark.Track>
</template>
