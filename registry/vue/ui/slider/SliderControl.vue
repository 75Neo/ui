<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

interface SliderControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SliderControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = slider();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
