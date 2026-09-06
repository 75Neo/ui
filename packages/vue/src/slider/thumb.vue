<script setup lang="ts">
import { computed } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cva } from "class-variance-authority";
import {
  cn,
  sliderDefaults,
  sliderSizeData,
  sliderThumbCompoundData,
  type SliderThumbProps,
} from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderThumb = cva(
  "rounded-full bg-default shadow-sm ring-2 transition-shadow outline-none focus-visible:outline-3 data-disabled:cursor-not-allowed",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: sliderSizeData.thumb,
    },
    compoundVariants: sliderThumbCompoundData,
    defaultVariants: sliderDefaults,
  },
);

const props = defineProps<
  SliderThumbProps & {
    class?: unknown;
  }
>();

const variants = useSliderVariants();
const thumbClass = computed(() => cn(sliderThumb(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Thumb :index="props.index" data-slot="slider-thumb" :class="thumbClass">
    <Ark.HiddenInput />
  </Ark.Thumb>
</template>
