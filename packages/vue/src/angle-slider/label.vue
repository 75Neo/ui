<script setup lang="ts">
import { computed } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cva } from "class-variance-authority";
import { angleSliderDefaults, angleSliderSizeData, cn } from "@75neo/themes";
import { useAngleSliderVariants } from "./variants";

const angleSliderLabel = cva("pointer-events-auto cursor-pointer text-muted select-none", {
  variants: { size: angleSliderSizeData.label },
  defaultVariants: angleSliderDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useAngleSliderVariants();
const labelClass = computed(() =>
  cn(angleSliderLabel({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Label data-slot="angle-slider-label" :class="labelClass">
    <slot />
  </Ark.Label>
</template>
