<script setup lang="ts">
import { computed } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cva } from "class-variance-authority";
import { ChevronLeft } from "@lucide/vue";
import { carouselDefaults, carouselSizeData, cn } from "@75neo/themes";
import { useCarouselVariants } from "./variants";

const carouselPrevTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-default text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: { size: carouselSizeData.trigger },
    defaultVariants: carouselDefaults,
  },
);

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useCarouselVariants();
const triggerClass = computed(() =>
  cn(carouselPrevTrigger(variants), props.class as string | undefined),
);
</script>

<template>
  <Ark.PrevTrigger data-slot="carousel-prev-trigger" :class="triggerClass">
    <slot>
      <component :is="ChevronLeft" />
    </slot>
  </Ark.PrevTrigger>
</template>
