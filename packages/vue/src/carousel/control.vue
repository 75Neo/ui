<script setup lang="ts">
import { Carousel as Ark } from "@ark-ui/vue/carousel";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Control
    data-slot="carousel-control"
    :class="
      cn(
        'flex items-center gap-3 data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:flex-1 data-[orientation=vertical]:flex-col',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Control>
</template>
