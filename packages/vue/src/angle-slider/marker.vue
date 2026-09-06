<script setup lang="ts">
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cn, type AngleSliderMarkerProps } from "@75neo/themes";

const props = defineProps<
  AngleSliderMarkerProps & {
    class?: unknown;
  }
>();
</script>

<template>
  <Ark.Marker
    :value="props.value"
    data-slot="angle-slider-marker"
    :class="
      cn(
        `absolute inset-0 before:absolute before:top-[3.5%] before:left-1/2 before:size-[5%] before:-translate-x-1/2 before:rounded-full before:bg-default before:content-['']`,
        props.class as string | undefined,
      )
    "
  />
</template>
