<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { sliderStyles as styles } from "@/registry/shared/lib/slider.styles";

interface SliderMarkerGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SliderMarkerGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.MarkerGroup :class="cn(styles.markerGroup(), props.class)">
    <slot />
  </Ark.MarkerGroup>
</template>
