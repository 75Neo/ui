<script setup lang="ts">
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.MarkerGroup
    data-slot="angle-slider-marker-group"
    :class="cn('pointer-events-none absolute inset-0', props.class as string | undefined)"
  >
    <slot />
  </Ark.MarkerGroup>
</template>
