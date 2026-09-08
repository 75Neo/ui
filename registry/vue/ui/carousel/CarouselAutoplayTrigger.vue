<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

interface CarouselAutoplayTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CarouselAutoplayTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = carousel();
</script>

<template>
  <Ark.AutoplayTrigger :class="cn(styles.autoplayTrigger(), props.class)">
    <slot />
  </Ark.AutoplayTrigger>
</template>
