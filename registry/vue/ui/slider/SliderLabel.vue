<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Slider as Ark } from "@ark-ui/vue/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

interface SliderLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SliderLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = slider();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
