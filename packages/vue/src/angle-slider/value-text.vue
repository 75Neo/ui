<script setup lang="ts">
import { computed } from "vue";
import { AngleSlider as Ark, useAngleSliderContext } from "@ark-ui/vue/angle-slider";
import { cva } from "class-variance-authority";
import { angleSliderColorData, angleSliderDefaults, angleSliderSizeData, cn } from "@75neo/themes";
import { useAngleSliderVariants } from "./variants";

const angleSliderValueText = cva("font-semibold tabular-nums", {
  variants: {
    color: angleSliderColorData.valueText,
    size: angleSliderSizeData.valueText,
  },
  defaultVariants: angleSliderDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useAngleSliderVariants();
const valueTextClass = computed(() =>
  cn(angleSliderValueText(variants), props.class as string | undefined),
);

// Ark's own text reads "45deg"; this readout spells the degree sign.
const angleSlider = useAngleSliderContext();
const degrees = computed(() => `${angleSlider.value.value}°`);
</script>

<template>
  <Ark.ValueText data-slot="angle-slider-value-text" :class="valueTextClass">
    <slot>{{ degrees }}</slot>
  </Ark.ValueText>
</template>
