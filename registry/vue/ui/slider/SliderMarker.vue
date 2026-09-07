<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

interface SliderMarkerProps {
  value: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<SliderMarkerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = slider();
</script>

<template>
  <Ark.Marker :value="props.value" :class="cn(styles.marker(), props.class)">
    <slot />
  </Ark.Marker>
</template>
