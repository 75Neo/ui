<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "cn";
import { carouselStyles as styles } from "@/registry/shared/lib/carousel.styles";

interface CarouselIndicatorGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CarouselIndicatorGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.IndicatorGroup :class="cn(styles.indicatorGroup(), props.class)">
    <slot />
  </Ark.IndicatorGroup>
</template>
