<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AngleSlider as Ark } from "@ark-ui/vue/angle-slider";
import { cn } from "cn";
import { angleSlider } from "@/registry/shared/lib/angle-slider.styles";

interface AngleSliderMarkerGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<AngleSliderMarkerGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = angleSlider();
</script>

<template>
  <Ark.MarkerGroup :class="cn(styles.markerGroup(), props.class)">
    <slot />
  </Ark.MarkerGroup>
</template>
