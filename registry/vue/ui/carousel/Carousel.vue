<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "cn";
import { carousel } from "@/registry/shared/lib/carousel.styles";

interface CarouselProps {
  slideCount: number;
  defaultPage?: number;
  slidesPerPage?: number;
  slidesPerMove?: number | "auto";
  spacing?: string;
  padding?: string;
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
  allowMouseDrag?: boolean;
  autoplay?: boolean | { delay: number };
  snapType?: "proximity" | "mandatory";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<CarouselProps>(), {
  loop: undefined,
  allowMouseDrag: undefined,
  autoplay: undefined,
});

const page = defineModel<number>("page");

defineSlots<{
  default?: () => unknown;
}>();

const styles = carousel();
</script>

<template>
  <Ark.Root
    v-model:page="page"
    :slide-count="props.slideCount"
    :default-page="props.defaultPage"
    :slides-per-page="props.slidesPerPage"
    :slides-per-move="props.slidesPerMove"
    :spacing="props.spacing"
    :padding="props.padding"
    :orientation="props.orientation"
    :loop="props.loop"
    :allow-mouse-drag="props.allowMouseDrag"
    :autoplay="props.autoplay"
    :snap-type="props.snapType"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
