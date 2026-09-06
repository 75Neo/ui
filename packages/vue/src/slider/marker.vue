<script setup lang="ts">
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn, type SliderMarkerProps } from "@75neo/themes";

const props = defineProps<
  SliderMarkerProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Marker
    :value="props.value"
    data-slot="slider-marker"
    :class="
      cn(
        'text-xs text-dimmed tabular-nums data-[state=under-value]:text-muted',
        props.class as string | undefined,
      )
    "
  >
    <slot />
  </Ark.Marker>
</template>
