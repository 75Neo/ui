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
  <Ark.IndicatorGroup
    data-slot="carousel-indicator-group"
    :class="
      cn(
        'flex items-center justify-center gap-2 data-[orientation=vertical]:flex-col',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.IndicatorGroup>
</template>
