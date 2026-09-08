<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "cn";
import { carouselStyles as styles } from "@/registry/shared/lib/carousel.styles";

interface CarouselPrevTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CarouselPrevTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.PrevTrigger :class="cn(styles.prevTrigger(), props.class)">
    <slot />
  </Ark.PrevTrigger>
</template>
