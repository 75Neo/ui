<script setup lang="ts">
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn, type CarouselItemProps } from "@75neo/themes";

const props = defineProps<
  CarouselItemProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item
    :index="props.index"
    data-slot="carousel-item"
    :class="
      cn(
        'min-w-0 shrink-0 basis-full snap-center overflow-hidden rounded-lg bg-muted',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Item>
</template>
