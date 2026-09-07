<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

interface SliderTrackProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SliderTrackProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = slider();
</script>

<template>
  <Ark.Track :class="cn(styles.track(), props.class)">
    <slot />
  </Ark.Track>
</template>
