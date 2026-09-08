<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "cn";
import { carouselStyles as styles } from "@/registry/shared/lib/carousel.styles";

interface CarouselItemProps {
  index: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<CarouselItemProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item :index="props.index" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
