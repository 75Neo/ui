<script setup lang="ts">
import { computed } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cva } from "class-variance-authority";
import { carouselDefaults, carouselSizeData, cn, type CarouselIndicatorProps } from "@75neo/themes";
import { useCarouselVariants } from "./variants";

const carouselIndicator = cva(
  "shrink-0 cursor-pointer rounded-full bg-accented outline-primary/25 transition-all duration-200 hover:bg-inverted/40 focus-visible:outline-3 data-current:bg-primary [&>svg]:size-full",
  {
    variants: { size: carouselSizeData.indicator },
    defaultVariants: carouselDefaults,
  },
);

const props = defineProps<
  CarouselIndicatorProps & {
    class?: unknown;
  }
>();

const variants = useCarouselVariants();
const indicatorClass = computed(() =>
  cn(carouselIndicator(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.Indicator :index="props.index" data-slot="carousel-indicator" :class="indicatorClass" />
</template>
