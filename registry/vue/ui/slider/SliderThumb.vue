<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

interface SliderThumbProps {
  index: number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<SliderThumbProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = slider();
</script>

<template>
  <Ark.Thumb :index="props.index" :class="cn(styles.thumb(), props.class)">
    <slot />
  </Ark.Thumb>
</template>
