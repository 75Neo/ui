<script setup lang="ts">
import { computed } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cva } from "class-variance-authority";
import { cn, sliderDefaults, sliderSizeData } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderValueText = cva("shrink-0 text-muted tabular-nums", {
  variants: { size: sliderSizeData.valueText },
  defaultVariants: sliderDefaults,
});

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useSliderVariants();
const valueTextClass = computed(() =>
  cn(sliderValueText({ size: variants.size }), props.class as string | undefined),
);
</script>

<template>
  <Ark.ValueText data-slot="slider-value-text" :class="valueTextClass">
    <!-- Ark reads the value itself when no slot arrives; an empty one crashes that. -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Ark.ValueText>
</template>
