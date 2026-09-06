<script setup lang="ts">
import { computed } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cva } from "class-variance-authority";
import {
  ANGLE_SLIDER_PATH_LENGTH,
  ANGLE_SLIDER_RADIUS,
  angleSliderColorData,
  angleSliderDefaults,
  angleSliderSizeData,
  cn,
} from "@75neo/themes";
import { useAngleSliderVariants } from "./variants";

const angleSliderControl = cva("relative aspect-square", {
  variants: { size: angleSliderSizeData.control },
  defaultVariants: angleSliderDefaults,
});

const angleSliderRange = cva(
  "fill-none stroke-12 [stroke-dasharray:var(--value)_360] [stroke-linecap:round]",
  {
    variants: { color: angleSliderColorData.range },
    defaultVariants: angleSliderDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useAngleSliderVariants();
const controlClass = computed(() =>
  cn(angleSliderControl({ size: variants.size }), props.class as string | undefined),
);
const rangeClass = computed(() => angleSliderRange({ color: variants.color }));
</script>

<template>
  <Ark.Control data-slot="angle-slider-control" :class="controlClass">
    <!-- Decoration only. The thumb carries the slider role and the value. -->
    <svg
      data-slot="angle-slider-dial"
      class="absolute inset-0 size-full origin-center -rotate-90"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <circle
        data-slot="angle-slider-track"
        class="fill-none stroke-accented stroke-12"
        cx="50"
        cy="50"
        :r="ANGLE_SLIDER_RADIUS"
      />
      <circle
        data-slot="angle-slider-range"
        :class="rangeClass"
        cx="50"
        cy="50"
        :r="ANGLE_SLIDER_RADIUS"
        :pathLength="ANGLE_SLIDER_PATH_LENGTH"
      />
    </svg>
    <slot />
  </Ark.Control>
</template>
