<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "cn";
import { carouselStyles as styles } from "@/registry/shared/lib/carousel.styles";

interface CarouselItemGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CarouselItemGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemGroup :class="cn(styles.itemGroup(), props.class)">
    <slot />
  </Ark.ItemGroup>
</template>
