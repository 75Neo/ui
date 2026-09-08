<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

interface CarouselNextTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<CarouselNextTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = carousel();
</script>

<template>
  <Ark.NextTrigger :class="cn(styles.nextTrigger(), props.class)">
    <slot />
  </Ark.NextTrigger>
</template>
