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
  <Ark.ItemGroup
    data-slot="carousel-item-group"
    :class="
      cn(
        'min-w-0 flex-1 overflow-hidden scroll-smooth data-[orientation=vertical]:min-h-0',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.ItemGroup>
</template>
