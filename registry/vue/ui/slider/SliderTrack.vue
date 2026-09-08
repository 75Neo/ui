<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { sliderStyles as styles } from "@/registry/shared/lib/slider.styles";

interface SliderTrackProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SliderTrackProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Track :class="cn(styles.track(), props.class)">
    <slot />
  </Ark.Track>
</template>
