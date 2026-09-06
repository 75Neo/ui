<script setup lang="ts">
import { computed } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cva } from "class-variance-authority";
import { angleSliderColorData, angleSliderDefaults, cn } from "@75neo/themes";
import { useAngleSliderVariants } from "./variants";

const angleSliderThumb = cva(
  "pointer-events-none absolute inset-0 outline-none before:pointer-events-auto before:absolute before:top-[-2%] before:left-1/2 before:size-[16%] before:-translate-x-1/2 before:rounded-full before:shadow-sm before:transition-transform before:content-[''] hover:before:scale-110 focus-visible:before:outline-3",
  {
    variants: { color: angleSliderColorData.thumb },
    defaultVariants: angleSliderDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

const variants = useAngleSliderVariants();
const thumbClass = computed(() =>
  cn(angleSliderThumb({ color: variants.color }), props.class as string | undefined),
);
</script>

<template>
  <Ark.Thumb data-slot="angle-slider-thumb" :class="thumbClass" />
</template>
